import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type T = {pointers: string[]};
const initialState: T = {pointers: []};
export const lobbySlice = createSlice({
    name: 'lobby',
    initialState,
    reducers: {
        add(state: T, action: PayloadAction<string>){
            const pointer = action.payload;
            state.pointers.push(pointer);
        },
        remove(state: T, action: PayloadAction<string>) {
            const pointer = action.payload;
            const index = state.pointers.indexOf(pointer);
            state.pointers.splice(index, 1);
        }
    }
});

export const lobbyReducer = lobbySlice.reducer;
