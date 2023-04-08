import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Pointer} from "@/utils/type";
import {DGame} from "@/data/Game";

type T = {pointer: Pointer<DGame>};
const initialState: T = {pointer: ''};
export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        add(state: T, action: PayloadAction<Pointer<DGame>>){state.pointer = action.payload},
        remove(state: T, action: PayloadAction<Pointer<DGame>>) {state.pointer = ''}
    }
});

export const gameReducer = gameSlice.reducer;
