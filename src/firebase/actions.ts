import {LLobby} from '@/data/lobby';
import {collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc} from '@firebase/firestore';
import {db} from '@/firebase/index';
import {ActionObj, ActionValue} from "@/utils/type";
import {ReduxAction} from "@/redux/actions";
import {Slice} from "@reduxjs/toolkit";

export class FirebaseAction {
    static async load(collectionName: string, slice: Slice): Promise<void> {
        const DOC = collection(db, collectionName);
        onSnapshot(DOC, (result) => {
            const objects: ActionObj[] = [];
            for(let doc of result.docs) { objects.push({...doc.data()} as ActionObj); }
            ReduxAction.set(objects, slice);
        });
    }

    static async add(obj: ActionObj): Promise<void> {
        const collection = FirebaseAction.getCollection(obj);
        if(collection) {
            const DOC = doc(db, collection, obj.id);
            await setDoc(DOC, obj,{merge: false});
        }
    }

    static async remove(obj: ActionObj): Promise<void> {
        const collection = FirebaseAction.getCollection(obj);
        if(collection) {
            const DOC = doc(db, collection, obj.id);
            await deleteDoc(DOC);
        }
    }

    static async edit(obj: ActionObj, field: string, value: ActionValue): Promise<void> {
        const collection = FirebaseAction.getCollection(obj);
        if(collection) {
            const DOC = doc(db, collection, obj.id);
            await updateDoc(DOC, field, value);
        }
    }

    static getCollection(obj: ActionObj): null|string {
        switch(obj.classname) {
            case LLobby.name: return 'lobbies';
            default: return null;
        }
    }
}

