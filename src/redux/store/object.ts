import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dictionary, DObject, EDIT, Pointer} from "@/utils/type";

type T = DObject
const initialState: { [id: Pointer<T>]: T} = {};
export const objectSlice = createSlice({
    name: 'object',
    initialState,
    reducers: {
        add(state: Dictionary<T>, action: PayloadAction<T>){
            const obj = action.payload;
            if(obj) state[String(obj.id)] = obj;
            else console.warn('REDUX: Object NOT defined');
        },
        remove(state: Dictionary<T>, action: PayloadAction<T>) {
            const obj = action.payload;
            delete state[String(obj.id)];
        },
        edit(state: Dictionary<T>, action: PayloadAction<EDIT>) {
            const payload = action.payload;

            const obj = payload.obj;
            const pointer = String(obj.id);
            const field = payload.field as keyof T;
            if(state[pointer]) state[pointer][field] = payload.value;
            else console.warn('REDUX: ' + pointer + ' is NOT in objects');

        }
    }
});

export const objectReducer = objectSlice.reducer;
