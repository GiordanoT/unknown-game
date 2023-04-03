import {store} from "@/redux/index";
import {Slice} from "@reduxjs/toolkit";
import {lobbySlice} from "@/redux/store/lobby";
import {ActionObj, ActionValue} from "@/utils/type";
import {userSlice} from "@/redux/store/user";
import {LLobby, LUser} from "@/data";
import {objectSlice} from "@/redux/store/object";

export class ReduxAction {
    static set(newObjects: ActionObj[], classname: string): void {
        const dict = store.getState().objects; const oldObjects: ActionObj[] = [];
        for(let pointer in dict) {
            const obj = dict[pointer];
            if (obj.classname === classname) oldObjects.push(obj);
        }
        for(let object of oldObjects) if(!newObjects.includes(object)) ReduxAction.remove(object);
        for(let object of newObjects) {
            if(!oldObjects.includes(object)) ReduxAction.add(object);
            else store.dispatch(objectSlice.actions.set({id: object.id, obj: object}));
        }
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

}

