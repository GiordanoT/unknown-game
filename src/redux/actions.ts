import {store} from "@/redux/index";
import {Slice} from "@reduxjs/toolkit";
import {lobbySlice} from "@/redux/store/lobby";
import {ActionObj, ActionValue} from "@/utils/type";
import {userSlice} from "@/redux/store/user";
import {LLobby, LUser} from "@/data";
import {objectSlice} from "@/redux/store/object";

export class ReduxAction {
    static set(objects: ActionObj[], collection: string): void {
        // todo: calculate delta and improve this
        const oldObjects = store.getState().objects;
        for(let pointer in oldObjects) {
            const obj = oldObjects[pointer];
            if(obj.classname !== LUser.name) ReduxAction.remove(oldObjects[pointer]);
        }
        for(let obj of objects) ReduxAction.add(obj);
    }

    static add(obj: ActionObj): void {
        store.dispatch(objectSlice.actions.add(obj));
        const slice = ReduxAction.getSliceByObj(obj);
        if(slice) store.dispatch(slice.actions.add(obj.id));
    }

    static remove(obj: ActionObj): void {
        store.dispatch(objectSlice.actions.remove(obj));
        const slice = ReduxAction.getSliceByObj(obj);
        if(slice) store.dispatch(slice.actions.remove(obj.id));
    }

    static edit(obj: ActionObj, field: keyof ActionObj, value: ActionValue): void {
        store.dispatch(objectSlice.actions.edit({obj, field, value}));
    }

    static getSliceByObj(obj: ActionObj): null|Slice {
        switch(obj.classname) {
            case LLobby.name: return lobbySlice;
            case LUser.name: return userSlice;
            default: return null;
        }
    }
    static getSliceByCollection(collection: string): null|Slice {
        switch(collection) {
            case 'lobbies': return lobbySlice;
            case 'users': return userSlice;
            default: return null;
        }
    }
}

