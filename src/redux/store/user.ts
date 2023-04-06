import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Pointer} from "@/utils/type";
import {DUser} from "@/data";

type T = {pointer: Pointer<DUser>};
const initialState: T = {pointer: ''};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        add(state: T, action: PayloadAction<Pointer<DUser>>){state.pointer = action.payload},
        remove(state: T, action: PayloadAction<Pointer<DUser>>) {state.pointer = ''}
    }
});

export const userReducer = userSlice.reducer;
