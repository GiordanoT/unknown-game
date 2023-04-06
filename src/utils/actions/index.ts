import {FirebaseAction} from "@/firebase/actions";
import {ReduxAction} from "@/redux/actions";
import {DObject, Value} from "@/utils/type";

export class Action {
    static Redux = 0;
    static Firebase = 1;
    static Mixin = 2;
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

    static edit(obj: DObject, field: keyof DObject, value: Value): void {
        ReduxAction.edit(obj, field, value);
        FirebaseAction.edit(obj, field, value);
    }
}

