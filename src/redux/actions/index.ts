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
        ReduxAction.add_FixMissingID(obj).then(() => {
            store.dispatch(objectSlice.actions.add(obj));
            U.log(`ADD ${obj.classname}`, obj);
            const slice = U.getSlice(obj);
            if(slice) ReduxPointerAction.add(slice, obj);
        });
    }

    static remove(obj: DObject): void {
        const slice = U.getSlice(obj);
        if(slice) ReduxPointerAction.remove(slice, obj);
        store.dispatch(objectSlice.actions.remove(obj));
        U.log(`REMOVE ${obj.classname}`, obj);
    }

    static edit<T extends DPointer>(obj: T, field: keyof T, value: Value): void {
        ReduxAction.edit_FixMissingID(String(field), value).then(() => {
            store.dispatch(objectSlice.actions.edit({obj, field: String(field), value}));
            U.log(`EDIT ${obj.classname}: ${String(field)} -> ${value}`);
        });
    }

    static reset(): void {
        const objects = store.getState().objects;
        for(let pointer in objects) ReduxAction.remove(objects[pointer]);
    }

    private static async add_FixMissingID(obj: DObject): Promise<void> {
        for(let field in obj) {
            const value = obj[field as keyof DObject];
            if(value) await ReduxAction.edit_FixMissingID(field, value);
        }
    }

    private static async edit_FixMissingID(field: string, value: Value): Promise<void> {
        if(typeof value === 'string' && U.isPointer(value)) {
            const pointer = value;
            const objects = store.getState().objects;
            const object: DObject|undefined = objects[pointer];
            if(field !== 'id' && !object) {
                const collection = U.getCollection(field);
                const constraint: CONSTRAINT<DObject> = {field: 'id', operator: '==', value: pointer}
                if(collection) {
                    const results = await FirebaseAction.select<DObject>(collection, constraint)
                    if(results.length > 0) {
                        const result = results[0];
                        ReduxAction.add(result);
                    }
                }
            }
        }
    }
}

