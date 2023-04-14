import {store} from "@/redux";
import {utilitySlice} from "@/redux/store/utility";

export class ReduxUtilityAction {
    static setLoading(value: boolean): void {
        if(value) store.dispatch(utilitySlice.actions.loadingStart());
        else store.dispatch(utilitySlice.actions.loadingEnd());
    }
    static setFirebaseListener(value: boolean): void {
        if(value) store.dispatch(utilitySlice.actions.firebaseLoad());
        else store.dispatch(utilitySlice.actions.firebaseUnload());
    }
    static setGameCode(value: string): void {
        store.dispatch(utilitySlice.actions.setGameCode(value));
    }
}

