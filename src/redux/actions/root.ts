import {Slice} from "@reduxjs/toolkit";
import {store} from "@/redux";
import {U} from "@/utils/functions";

export class ReduxRootAction {
    static add(slice: Slice, obj: any): void {
        store.dispatch(slice.actions.add(obj));
        U.log('ADD ROOT', obj);
    }

    static remove(slice: Slice, obj: any): void {
        store.dispatch(slice.actions.remove(obj));
        U.log('REMOVE ROOT', obj);
    }

    static edit(slice: Slice, obj: any, field: any, value: any): void {
        alert('todo');
    }

}

