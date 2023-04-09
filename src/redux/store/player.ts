import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Pointer} from "@/utils/type";
import {DUser} from "@/data/User";

type T = {pointers: Pointer<DUser>[]};
const initialState: T = {pointers: []};
export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        add(state: T, action: PayloadAction<Pointer<DUser>>){
            const pointer = action.payload;
            state.pointers.push(pointer);
        },
        remove(state: T, action: PayloadAction<Pointer<DUser>>) {
            const pointer = action.payload;
            const index = state.pointers.indexOf(pointer);
            state.pointers.splice(index, 1);
        }
    }
});

export const playerReducer = playerSlice.reducer;
