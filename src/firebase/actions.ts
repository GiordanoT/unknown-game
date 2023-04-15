import {
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    or,
    Query,
    query,
    QueryFieldFilterConstraint,
    setDoc,
    updateDoc,
    where
} from '@firebase/firestore';
import {auth, db} from '@/firebase/index';
import {CONSTRAINT, DObject, Pointer, Value} from "@/utils/type";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@firebase/auth";
import {MixinAction} from "@/utils/actions";
import {ReduxAction} from "@/redux/actions";
import {U} from "@/utils/functions";
import {DPointer} from "@/data/Pointer";
import {DUser, LUser} from "@/data/User";
import {store} from "@/redux";

export class FirebaseAction {

    static async select<T extends DPointer>(collectionName: string, constraints?: CONSTRAINT<T>|CONSTRAINT<T>[], isAND: boolean = true): Promise<T[]> {
        const DOC = collection(db, collectionName);
        if(constraints) {
            const _constraints = (Array.isArray(constraints)) ? constraints : [constraints];
            if(_constraints.length > 0) return await FirebaseAction._selectWithConditions(DOC, _constraints, isAND);
            else return await FirebaseAction._selectWithoutConditions(DOC);
        }
        else return await FirebaseAction._selectWithoutConditions(DOC);
    }

    private static async _selectWithConditions<T extends DPointer>(DOC: CollectionReference, constraints: CONSTRAINT<T>[], isAND: boolean): Promise<T[]> {
        const objects: T[] = [];
        const conditions: QueryFieldFilterConstraint[] = [];
        for(let constraint of constraints) {
            const field = constraint.field;
            const operator = constraint.operator;
            const value = constraint.value;
            conditions.push(where(String(field), operator, value));
        }
        let q: Query;
        if(isAND) q = query(DOC, ...conditions);
        else q = query(DOC, or(...conditions));
        const qs = await getDocs(q);
        qs.forEach((doc) => {objects.push({...doc.data()} as T)});
        return objects;
    }

    private static async _selectWithoutConditions<T extends DPointer>(DOC: CollectionReference): Promise<T[]> {
        const objects: T[] = [];
        const q = query(DOC); const qs = await getDocs(q);
        qs.forEach((doc) => {objects.push({...doc.data()} as T)});
        return objects
    }

    static async load(collectionName: string, className: string, id?: Pointer): Promise<any> {
        if(id) await FirebaseAction._loadDocument(collectionName, id, className);
        else await FirebaseAction._loadCollection(collectionName, className);
    }

    private static async _loadDocument(collectionName: string, id: Pointer, className: string): Promise<void> {
        const DOC = doc(db, collectionName, id);
        onSnapshot(DOC, (result) => {
            const firebaseListener = store.getState().utility.firebaseListener;
            if(firebaseListener) {
                const objects = [{...result.data()} as DObject];
                ReduxAction.load(objects, className);
            }
        });
    }

    private static async _loadCollection(collectionName: string, className: string): Promise<void> {
        const DOC = collection(db, collectionName);
        onSnapshot(DOC, (result) => {
            const objects: DObject[] = [];
            for(let doc of result.docs) objects.push({...doc.data()} as DObject);
            ReduxAction.load(objects, className);
        });
    }

    static async add(obj: DObject): Promise<void> {
        const collection = U.getCollection(obj);
        if(collection) {
            const DOC = doc(db, collection, String(obj.id));
            await setDoc(DOC, obj,{merge: false});
        }
    }

    static async remove(obj: DObject): Promise<void> {
        const collection = U.getCollection(obj);
        if(collection) {
            const DOC = doc(db, collection, String(obj.id));
            await deleteDoc(DOC);
        }
    }

    static async edit<T extends DPointer>(obj: T, field: keyof T, Value: Value): Promise<void> {
        const collection = U.getCollection(obj);
        if(collection) {
            const DOC = doc(db, collection, String(obj.id));
            await updateDoc(DOC, String(field), Value);
        }
    }

    static async signin(email: string, password: string): Promise<boolean> {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const name = 'USER' + Date.now();
            const dUser: DUser = {name, email, role: 'playerOne', deck: 'todo: change'};
            const user = LUser.new(dUser);
            await MixinAction.add(user.raw);
            return true;
        } catch (error) {return false;}
    }

    static async login(email: string, password: string): Promise<boolean> {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const constraint: CONSTRAINT<DUser> = {field: 'email', operator: '==', value: email};
            const users = await FirebaseAction.select<DUser>('users', constraint);
            if(users.length > 0) ReduxAction.add(users[0]);
            return true;
        } catch (error) {return false;}
    }

    static async logout(): Promise<void> {
        await signOut(auth);
    }

}

