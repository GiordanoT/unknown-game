import {FirebaseAction} from "@/firebase/actions";
import {ReduxAction} from "@/redux/actions";
import {ActionObj, ActionValue} from "@/utils/type";

export class MixinAction {
    static add(obj: ActionObj): void {
        ReduxAction.add(obj);
        FirebaseAction.add(obj);
    }

    static remove(obj: ActionObj): void {
        ReduxAction.remove(obj);
        FirebaseAction.remove(obj);
    }

    static edit(obj: ActionObj, field: string, value: ActionValue): void {
        ReduxAction.edit(obj, field, value);
        FirebaseAction.edit(obj, field, value);
    }
}

