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
            if(!oldObject) {
                ReduxAction.add(dict.obj);
            }
            else U.delta(oldObject, newObject);
        }
    }

    static add(obj: DObject): void {
        ReduxAction.addFIX(obj).then((dict) => {
            store.dispatch(objectSlice.actions.add(dict.obj));
            U.log(`ADD ${obj.classname}`, dict.obj);
            const slice = U.getSlice(dict.obj);
            if(slice) ReduxPointerAction.add(slice, dict.obj);
        });
    }

    static remove(obj: DObject): void {
        const slice = U.getSlice(obj);
        if(slice) ReduxPointerAction.remove(slice, obj);
        store.dispatch(objectSlice.actions.remove(obj));
        U.log(`REMOVE ${obj.classname}`, obj);
    }

    static edit<T extends DPointer>(obj: T, field: keyof T, value: Value): void {
        ReduxAction.editFIX(obj, String(field), value).then((dict) => {
            const dEdit = {obj: dict.obj, field: dict.field, value: dict.value};
            store.dispatch(objectSlice.actions.edit(dEdit));
            U.log(`EDIT ${obj.classname}: ${String(dict.field)} -> ${dict.value}`);
        });
    }

    static reset(): void {
        const objects = store.getState().objects;
        for(let pointer in objects) ReduxAction.remove(objects[pointer]);
    }

    private static async editFIX(obj: DObject, field: string, _values: Value): Promise<{obj: DObject, field: keyof DObject, value: Value}> {
        const excludedFields = ['id'];
        let values = _values as Value;
        values = (Array.isArray(values)) ? values : [values];
        for(let value of values) {
            if (!excludedFields.includes(field) && typeof value === 'string' && U.isPointer(value)) {
                const pointer = value;
                const objects = store.getState().objects;
                const object: DObject | undefined = objects[pointer];
                if (!object) {
                    const collection = U.getCollection(field);
                    const constraint: CONSTRAINT<DObject> = {field: 'id', operator: '==', value: pointer}
                    if (collection) {
                        const results = await FirebaseAction.select<DObject>(collection, constraint)
                        if (results.length > 0) {
                            const result = results[0];
                            ReduxAction.add(result);
                        }
                    }
                }
            }
        }
        return {obj, field: field as keyof DObject, value: _values};
    }

    private static async addFIX(obj: DObject): Promise<{obj: DObject}> {
        const excludedFields = ['id'];
        for(let field in obj) {
            let values = obj[field as keyof DObject] as Value;
            values = (Array.isArray(values)) ? values : [values];
            for(let value of values) {
                if (!excludedFields.includes(field) && typeof value === 'string' && U.isPointer(value)) {
                    const pointer = value;
                    const objects = store.getState().objects;
                    const object: DObject | undefined = objects[pointer];
                    if (!object) {
                        const collection = U.getCollection(field);
                        const constraint: CONSTRAINT<DObject> = {field: 'id', operator: '==', value: pointer}
                        if (collection) {
                            const results = await FirebaseAction.select<DObject>(collection, constraint)
                            if (results.length > 0) {
                                const result = results[0];
                                ReduxAction.add(result);
                            }
                        }
                    }
                }
            }
        }
        return {obj};
    }
}

