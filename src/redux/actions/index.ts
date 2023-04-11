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
                for(let field in newObject)
                    ReduxAction.addFIX(newObject).then((dict) => {
                        ReduxAction.add(dict.obj);
                    });
            } else U.delta(oldObject, newObject);
        }
    }

    static add(obj: DObject): void {
        store.dispatch(objectSlice.actions.add(obj));
        U.log(`ADD ${obj.classname}`, obj);
        const slice = U.getSlice(obj);
        if(slice) ReduxPointerAction.add(slice, obj);
    }

    static remove(obj: DObject): void {
        const slice = U.getSlice(obj);
        if(slice) ReduxPointerAction.remove(slice, obj);
        store.dispatch(objectSlice.actions.remove(obj));
        U.log(`REMOVE ${obj.classname}`, obj);
    }

    static edit<T extends DPointer>(obj: T, field: keyof T, value: Value): void {
        store.dispatch(objectSlice.actions.edit({obj, field: String(field), value}));
        U.log(`EDIT ${obj.classname}: ${String(field)} -> ${value}`);
    }

    static reset(): void {
        const objects = store.getState().objects;
        for(let pointer in objects) ReduxAction.remove(objects[pointer]);
    }

    static async editFIX(obj: DObject, field: string, value: Value): Promise<{obj: DObject, field: keyof DObject, value: Value}> {
        const excludedFields = ['id'];
        if(!excludedFields.includes(field) && typeof value === 'string' && U.isPointer(value)) {
            const pointer = value;
            const objects = store.getState().objects;
            const object: DObject|undefined = objects[pointer];
            if(!object) {
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
        return {obj, field: field as keyof DObject, value};
    }

    static async addFIX(obj: DObject): Promise<{obj: DObject}> {
        const excludedFields = ['id'];
        for(let field in obj) {
            const value = obj[field as keyof DObject];
            if(!excludedFields.includes(field) && typeof value === 'string' && U.isPointer(value)) {
                const pointer = value;
                const objects = store.getState().objects;
                const object: DObject|undefined = objects[pointer];
                if(!object) {
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
        return {obj};
    }
}

