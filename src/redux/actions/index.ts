import {store} from "@/redux";
import {CONSTRAINT, DObject, Value} from "@/utils/type";
import {objectSlice} from "@/redux/store/object";
import {U} from "@/utils/functions";
import {ReduxPointerAction} from "@/redux/actions/pointer";
import {DPointer} from "@/data/Pointer";
import {FirebaseAction} from "@/firebase/actions";

export class ReduxAction {
    static load(newObjects: DObject[], classname: string): void {
        const dict = store.getState().objects; const oldObjects: DObject[] = [];
        for(let pointer in dict) {
            const obj = dict[pointer];
            if (obj.classname === classname) oldObjects.push(obj);
        }
        for(let oldObject of oldObjects) {
            const newObject = newObjects.find((obj) => {return obj.id === oldObject.id});
            if(!newObject) ReduxAction.remove(oldObject);
        }
        for(let newObject of newObjects) {
            const oldObject = oldObjects.find((obj) => {return obj.id === newObject.id});
            if(!oldObject) ReduxAction.add(newObject);
            else U.delta(oldObject, newObject);
        }
    }

    static add(obj: DObject): void {
        ReduxAction.fixMissingID(obj);
        store.dispatch(objectSlice.actions.add(obj));
        U.log('ADD OBJ', obj);
        const slice = U.getSlice(obj);
        if(slice) ReduxPointerAction.add(slice, obj);
    }

    static remove(obj: DObject): void {
        const slice = U.getSlice(obj);
        if(slice) ReduxPointerAction.remove(slice, obj);
        store.dispatch(objectSlice.actions.remove(obj));
        U.log('REMOVE OBJ', obj);
    }

    static edit<T extends DPointer>(obj: T, field: keyof T, value: Value): void {
        ReduxAction.fixMissingID(obj, String(field), value);
        store.dispatch(objectSlice.actions.edit({obj, field: String(field), value}));
        U.log('EDIT OBJ', obj);
    }

    static reset(): void {
        const objects = store.getState().objects;
        for(let pointer in objects) ReduxAction.remove(objects[pointer]);
    }

    private static fixMissingID(obj: DObject, field?: string, value?: Value): void {
        if(field && value !== undefined) ReduxAction._fixMissingID(field, value);
        else {
            for(let field in obj) {
                const value = obj[field as keyof DObject];
                if(value) ReduxAction._fixMissingID(field, value);
            }
        }
    }

    private static _fixMissingID(field: string, value: Value): void {
        if(typeof value === 'string' && U.isPointer(value)) {
            const pointer = value;
            const objects = store.getState().objects;
            if(field !== 'id' && !objects[pointer]) {
                const collection = U.getCollection(field);
                const constraint: CONSTRAINT<DObject> = {field: 'id', operator: '==', value: pointer}
                if(collection) FirebaseAction.select<DObject>(collection, constraint).then((results) => {
                    if(results.length > 0) {
                        const result = results[0];
                        ReduxAction.add(result);
                    }
                });
            }
        }
    }

}

