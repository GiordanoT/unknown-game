import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type T = {pointer: string};
const initialState: T = {pointer: ''};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set(state: T){state.pointer = ''},
        add(state: T, action: PayloadAction<string>){state.pointer = action.payload},
        remove(state: T, action: PayloadAction<string>) {state.pointer = ''}
    }
});

export const userReducer = userSlice.reducer;
