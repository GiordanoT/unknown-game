import {
    collection,
    CollectionReference,
    deleteDoc,
    doc, DocumentData,
    getDocs,
    onSnapshot,
    query, QueryFieldFilterConstraint,
    setDoc,
    updateDoc,
    where
} from '@firebase/firestore';
import {auth, db} from '@/firebase/index';
import {ActionObj, ActionValue, Pointer} from "@/utils/type";
import {ReduxAction} from "@/redux/actions";
import {DPointer, DUser, LLobby, LUser} from "@/data";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@firebase/auth";
import {MixinAction} from "@/utils/actions";
import {isArray} from "util";

export class FirebaseAction {


    private static async _selectWithConditions<T>(DOC: CollectionReference, fields: (keyof T)[], values: ActionValue[]): Promise<T[]> {
        if(fields.length !== values.length) return [];
        const objects: T[] = []; const length = fields.length;
        const conditions: QueryFieldFilterConstraint[] = [];
        let index = 0;
        while(index < length) {
            const field = fields[index]; const value = values[index];
            conditions.push(where(String(field), '==', value));
            index += 1;
        }
        const q = query(DOC, ...conditions);
        const qs = await getDocs(q);
        qs.forEach((doc) => {objects.push({...doc.data()} as T)});
        return objects;
    }

    private static async _selectWithoutConditions<T>(DOC: CollectionReference): Promise<T[]> {
        const objects: T[] = [];
        const q = query(DOC); const qs = await getDocs(q);
        qs.forEach((doc) => {objects.push({...doc.data()} as T)});
        return objects
    }

    static async select<T extends DPointer>(collectionName: string, fields?: keyof T | (keyof T)[], values?: ActionValue|ActionValue[]): Promise<T[]> {
        const DOC = collection(db, collectionName);
        if(fields && values) {
            const _fields = (Array.isArray(fields)) ? fields : [fields];
            const _values = (Array.isArray(values)) ? values : [values];
            return await FirebaseAction._selectWithConditions(DOC, _fields, _values);
        }
        else return await FirebaseAction._selectWithoutConditions(DOC);
    }

    static loadDocument(collectionName: string, id: Pointer, className: string): void {FirebaseAction._loadDocument(collectionName, id, className).then();}
    private static async _loadDocument(collectionName: string, id: Pointer, className: string): Promise<void> {
        const DOC = doc(db, collectionName, id);
        onSnapshot(DOC, (result) => {
            const objects = [{...result.data()} as ActionObj];
            ReduxAction.set(objects, className);
        });
    }

    static loadCollection(collectionName: string, className: string): void {FirebaseAction._loadCollection(collectionName, className).then();}
    private static async _loadCollection(collectionName: string, className: string): Promise<void> {
        const DOC = collection(db, collectionName);
        onSnapshot(DOC, (result) => {
            const objects: ActionObj[] = [];
            for(let doc of result.docs) objects.push({...doc.data()} as ActionObj);
            ReduxAction.set(objects, className);
        });
    }

    static add(obj: ActionObj): void {FirebaseAction._add(obj).then();}
    private static async _add(obj: ActionObj): Promise<void> {
        const collection = FirebaseAction.getCollection(obj);
        if(collection) {
            const DOC = doc(db, collection, obj.id);
            await setDoc(DOC, obj,{merge: false});
        }
    }

    static remove(obj: ActionObj): void {FirebaseAction._remove(obj).then();}
    private static async _remove(obj: ActionObj): Promise<void> {
        const collection = FirebaseAction.getCollection(obj);
        if(collection) {
            const DOC = doc(db, collection, obj.id);
            await deleteDoc(DOC);
        }
    }

    static edit(obj: ActionObj, field: string, value: ActionValue): void {FirebaseAction._edit(obj, field, value).then();}
    private static async _edit(obj: ActionObj, field: string, value: ActionValue): Promise<void> {
        const collection = FirebaseAction.getCollection(obj);
        if(collection) {
            const DOC = doc(db, collection, obj.id);
            await updateDoc(DOC, field, value);
        }
    }

    static getCollection(obj: ActionObj): null|string {
        switch(obj.classname) {
            case LLobby.name: return 'lobbies';
            case LUser.name: return 'users';
            default: return null;
        }
    }

    static async signin(email: string, password: string) {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const name = 'USER' + Date.now();
            const user = new LUser(name, email);
            MixinAction.add(user.raw());
            return true;
        } catch (error) {return false;}
    }

    static async login(email: string, password: string): Promise<boolean> {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const users = await FirebaseAction.select<DUser>('users', 'email', email);
            if(users.length > 0) ReduxAction.add(users[0]);
            return true;
        } catch (error) {return false;}
    }

    static logout(user: LUser): void { FirebaseAction._logout(user).then(); }
    private static async _logout(user: LUser): Promise<void> {
        const result = await signOut(auth);
        ReduxAction.remove(user.raw());
    }

}

