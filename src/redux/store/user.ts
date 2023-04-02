import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ActionValue, Dictionary} from "@/utils/type";
import {DUser} from "@/data";

type T = DUser;
const initialState: { [id: string]: T} = {};
interface EDIT { obj: T, field: keyof T, value: ActionValue }
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set(state: Dictionary<T>, action: PayloadAction<T[]>) {
            for(let pointer in state) { delete state[pointer]; }
            for(let obj of action.payload) { state[obj.id] = obj; }
        },
        add(state: Dictionary<T>, action: PayloadAction<T>){
            const obj = action.payload;
            state[obj.id] = obj;
        },
        remove(state: Dictionary<T>, action: PayloadAction<T>) {
            const obj = action.payload;
            delete state[obj.id];
        },
        edit(state: Dictionary<any>, action: PayloadAction<EDIT>) {
            const payload = action.payload;
            const obj = payload.obj;
            const field = payload.field;
            state[obj.id][field] = payload.value;
        }
    }
});

export const userReducer = userSlice.reducer;
