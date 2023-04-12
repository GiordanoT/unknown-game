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
            case 1: FirebaseAction.add(obj).then(); break;
            default: MixinAction.add(obj).then(); break;
        }
    }

    static REMOVE(obj: DObject, layer: number): void {
        switch(layer) {
            case 0: ReduxAction.remove(obj); break;
            case 1: FirebaseAction.remove(obj).then(); break;
            default: MixinAction.remove(obj).then(); break;
        }
    }

    static EDIT<T extends DPointer>(obj: T, field: keyof T, value: Value, layer: number): void {
        switch(layer) {
            case 0: ReduxAction.edit(obj, field, value); break;
            case 1: FirebaseAction.edit(obj, field, value).then(); break;
            default: MixinAction.edit<T>(obj, field, value).then(); break;
        }
    }
}

export class MixinAction {
    static async add(obj: DObject): Promise<void> {
        ReduxAction.add(obj);
        await FirebaseAction.add(obj);
    }

    static async remove(obj: DObject): Promise<void> {
        ReduxAction.remove(obj);
        await FirebaseAction.remove(obj);
    }

    static async edit<T extends DPointer>(obj: T, field: keyof T, value: Value): Promise<void> {
        ReduxAction.edit(obj, field, value);
        await FirebaseAction.edit(obj, field, value);
    }
}

