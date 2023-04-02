import {store} from "@/redux/index";
import {Slice} from "@reduxjs/toolkit";
import {lobbySlice} from "@/redux/store/lobby";
import {ActionObj, ActionValue} from "@/utils/type";
import {userSlice} from "@/redux/store/user";
import {LLobby, LUser} from "@/data";

export class ReduxAction {
    static set(objects: ActionObj[], slice: null|Slice): void {
        if(slice) { store.dispatch(slice.actions.set(objects)); }
    }

    static add(obj: ActionObj): void {
        const slice = ReduxAction.getSlice(obj);
        if(slice) { store.dispatch(slice.actions.add(obj)); }
    }

    static remove(obj: ActionObj): void {
        const slice = ReduxAction.getSlice(obj);
        if(slice) { store.dispatch(slice.actions.remove(obj)); }
    }

    static edit(obj: ActionObj, field: string, value: ActionValue): void {
        const slice = ReduxAction.getSlice(obj);
        if(slice) { store.dispatch(slice.actions.edit({obj: obj, field, value})); }
    }
    static getSlice(obj: ActionObj): null|Slice {
        switch(obj.classname) {
            case LLobby.name: return lobbySlice;
            case LUser.name: return userSlice;
            default: return null;
        }
    }
}

