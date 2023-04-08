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
            state[String(obj.id)] = obj;
        },
        remove(state: Dictionary<T>, action: PayloadAction<T>) {
            const obj = action.payload;
            delete state[String(obj.id)];
        },
        edit(state: Dictionary<T>, action: PayloadAction<EDIT>) {
            const payload = action.payload;
            const obj = payload.obj;
            const field = payload.field;
            state[String(obj.id)][field as keyof T] = payload.value;
        }
    }
});

export const objectReducer = objectSlice.reducer;
