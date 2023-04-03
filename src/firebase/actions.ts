import {collection, deleteDoc, doc, getDocs, onSnapshot, query, setDoc, updateDoc, where} from '@firebase/firestore';
import {auth, db} from '@/firebase/index';
import {ActionObj, ActionValue} from "@/utils/type";
import {ReduxAction} from "@/redux/actions";
import {DPointer, DUser, LLobby, LUser} from "@/data";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@firebase/auth";
import {MixinAction} from "@/utils/actions";

export class FirebaseAction {
    static load(collectionName: string): void {FirebaseAction._load(collectionName).then();}
    private static async _load(collectionName: string): Promise<void> {
        const DOC = collection(db, collectionName);
        onSnapshot(DOC, (result) => {
            const objects: ActionObj[] = [];
            for(let doc of result.docs) { objects.push({...doc.data()} as ActionObj); }
            ReduxAction.set(objects, collectionName);
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
        await signOut(auth).then(() => {
            ReduxAction.remove(user.raw());
        });
    }

    static async select<T extends DPointer>(path: string, field?: keyof T, value?: ActionValue): Promise<T[]> {
        const objects: T[] = [];
        const DOC = collection(db, path);
        if(field && value !== undefined) {
            const q = query(DOC, where(String(field), '==', value));
            const qs = await getDocs(q);
            qs.forEach((doc) => {objects.push({...doc.data()} as T)});
        } else {
            const q = query(DOC); const qs = await getDocs(q);
            qs.forEach((doc) => {objects.push({...doc.data()} as T)});
        }
        return objects
    }

}

