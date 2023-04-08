import {FirebaseAction} from "@/firebase/actions";
import {ReduxAction} from "@/redux/actions";
import {DObject, Value} from "@/utils/type";
import {DPointer} from "@/data/Pointer";

export class Action {
    static Redux = 0;
    static Firebase = 1;
    static Mixin = 2;

    static ADD(obj: DObject, layer: number): void {
        switch(layer) {
            case 0: ReduxAction.add(obj); break;
            case 1: FirebaseAction.add(obj); break;
            default: MixinAction.add(obj); break;
        }
    }

    static REMOVE(obj: DObject, layer: number): void {
        switch(layer) {
            case 0: ReduxAction.remove(obj); break;
            case 1: FirebaseAction.remove(obj); break;
            default: MixinAction.remove(obj); break;
        }
    }

    static EDIT<T extends DPointer>(obj: T, field: keyof T, value: Value, layer: number): void {
        switch(layer) {
            case 0: ReduxAction.edit(obj, field, value); break;
            case 1: FirebaseAction.edit(obj, field, value); break;
            default: MixinAction.edit<T>(obj, field, value); break;
        }
    }
}

export class MixinAction {
    static add(obj: DObject): void {
        ReduxAction.add(obj);
        FirebaseAction.add(obj);
    }

    static remove(obj: DObject): void {
        ReduxAction.remove(obj);
        FirebaseAction.remove(obj);
    }

    static edit<T extends DPointer>(obj: T, field: keyof T, value: Value): void {
        ReduxAction.edit(obj, field, value);
        FirebaseAction.edit(obj, field, value);
    }
}

