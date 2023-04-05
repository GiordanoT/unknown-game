import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ActionObj, Dictionary, EDIT, Pointer} from "@/utils/type";

type T = ActionObj;
const initialState: { [id: Pointer]: T} = {};
export const objectSlice = createSlice({
    name: 'object',
    initialState,
    reducers: {
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
