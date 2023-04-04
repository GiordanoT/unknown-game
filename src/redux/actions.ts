import {store} from "@/redux/index";
import {Slice} from "@reduxjs/toolkit";
import {lobbySlice} from "@/redux/store/lobby";
import {ActionObj, ActionValue} from "@/utils/type";
import {userSlice} from "@/redux/store/user";
import {LLobby, LUser} from "@/data";
import {objectSlice} from "@/redux/store/object";
import {U} from "@/utils/functions";

export class ReduxAction {
    static set(newObjects: ActionObj[], classname: string): void {
        const dict = store.getState().objects; const oldObjects: ActionObj[] = [];
        for(let pointer in dict) {
            const obj = dict[pointer];
            if (obj.classname === classname) oldObjects.push(obj);
        }
        for(let oldObject of oldObjects) {
            const newObject = newObjects.find((obj) => {return obj.id === oldObject.id});
            if(!newObject) ReduxAction.remove(oldObject);
        }
        for(let newObject of newObjects) {
            const oldObject = oldObjects.find((obj) => {return obj.id === newObject.id});
            if(!oldObject) ReduxAction.add(newObject);
            else U.delta(oldObject, newObject);
        }
    }

    static add(obj: ActionObj): void {
        store.dispatch(objectSlice.actions.add(obj));
        const slice = ReduxAction.getSliceByObj(obj);
        if(slice) store.dispatch(slice.actions.add(obj.id));
        U.log('ADD', obj);
    }

    static remove(obj: ActionObj): void {
        store.dispatch(objectSlice.actions.remove(obj));
        const slice = ReduxAction.getSliceByObj(obj);
        if(slice) store.dispatch(slice.actions.remove(obj.id));
        U.log('REMOVE', obj);
    }

    static edit(obj: ActionObj, field: keyof ActionObj, value: ActionValue): void {
        store.dispatch(objectSlice.actions.edit({obj, field, value}));
        U.log('EDIT', obj);
    }

    static getSliceByObj(obj: ActionObj): null|Slice {
        switch(obj.classname) {
            case LLobby.name: return lobbySlice;
            case LUser.name: return userSlice;
            default: return null;
        }
    }

}

