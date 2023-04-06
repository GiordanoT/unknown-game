import {FirebaseAction} from "@/firebase/actions";
import {ReduxObjAction} from "@/redux/actions/object";
import {DObject, Value} from "@/utils/type";

export class Action {
    static Redux = 0;
    static Firebase = 1;
    static Mixin = 2;
}

export class MixinAction {
    static add(obj: DObject): void {
        ReduxObjAction.add(obj);
        FirebaseAction.add(obj);
    }

    static remove(obj: DObject): void {
        ReduxObjAction.remove(obj);
        FirebaseAction.remove(obj);
    }

    static edit(obj: DObject, field: keyof DObject, value: Value): void {
        ReduxObjAction.edit(obj, field, value);
        FirebaseAction.edit(obj, field, value);
    }
}

