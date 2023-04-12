import {Slice} from "@reduxjs/toolkit";
import {store} from "@/redux";
import {U} from "@/utils/functions";
import {DObject} from "@/utils/type";

export class ReduxRawAction {
    static add(slice: Slice, obj: DObject): void {
        store.dispatch(slice.actions.add(obj.id));
        U.log(`ADD RAW ${obj.id}`);
    }

    static remove(slice: Slice, obj: DObject): void {
        store.dispatch(slice.actions.remove(obj.id));
        U.log(`REMOVE RAW ${obj.id}`);
    }

}

