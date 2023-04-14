import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Pointer} from "@/utils/type";
import {DDeck} from "@/data/Deck";

type T = {pointers: Pointer<DDeck>[]};
const initialState: T = {pointers: []};
export const deckSlice = createSlice({
    name: 'deck',
    initialState,
    reducers: {
        add(state: T, action: PayloadAction<Pointer<DDeck>>){
            const pointer = action.payload;
            if(!state.pointers.includes(pointer)) state.pointers.push(pointer);
        },
        remove(state: T, action: PayloadAction<Pointer<DDeck>>) {
            const pointer = action.payload;
            const index = state.pointers.indexOf(pointer);
            state.pointers.splice(index, 1);
        }
    }
});

export const deckReducer = deckSlice.reducer;
