import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DObject, Dictionary, EDIT, Pointer} from "@/utils/type";

type T = DObject;
const initialState: { [id: Pointer]: T} = {};
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
            state[String(obj.id)][field] = payload.value;
        }
    }
});

export const objectReducer = objectSlice.reducer;
