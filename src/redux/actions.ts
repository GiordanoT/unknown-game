import {store} from "@/redux/index";
import {Slice} from "@reduxjs/toolkit";
import {LNamed} from "@/data/named";
import {LLobby} from "@/data/lobby";
import {lobbySlice} from "@/redux/store/lobby";

type T = LNamed|LLobby;
export class ReduxAction {
    static add(obj: T): void {
        const slice = ReduxAction.getSlice(obj);
        if(slice) { store.dispatch(slice.actions.add(obj.raw())); }
    }

    static remove(obj: T): void {
        const slice = ReduxAction.getSlice(obj);
        if(slice) { store.dispatch(slice.actions.remove(obj.raw())); }
    }

    static edit(obj: T, field: string, value: string|number|boolean): void {
        const slice = ReduxAction.getSlice(obj);
        if(slice) { store.dispatch(slice.actions.edit({obj: obj.raw(), field, value})); }
    }
    static getSlice(obj: T): null|Slice {
        switch(obj.classname) {
            case LLobby.name: return lobbySlice;
            default: return null;
        }
    }
}

