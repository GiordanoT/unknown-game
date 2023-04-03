import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ActionObj, Dictionary, EDIT, SET} from "@/utils/type";

type T = ActionObj;
const initialState: { [id: string]: T} = {};
export const objectSlice = createSlice({
    name: 'object',
    initialState,
    reducers: {
        set(state: Dictionary<T>, action: PayloadAction<SET>) {
            const payload = action.payload;
            state[payload.id] = payload.obj;
        },
        add(state: Dictionary<T>, action: PayloadAction<T>){
            const obj = action.payload;
            state[obj.id] = obj;
        },
        remove(state: Dictionary<T>, action: PayloadAction<T>) {
            const obj = action.payload;
            delete state[obj.id];
        },
        edit(state: Dictionary<T>, action: PayloadAction<EDIT>) {
            const payload = action.payload;
            const obj = payload.obj;
            const field = payload.field;
            state[obj.id][field] = payload.value;
        }
    }
});

export const objectReducer = objectSlice.reducer;
