import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Pointer} from "@/utils/type";
import {DCard} from "@/data/Card";

type T = {pointers: Pointer<DCard>[]};
const initialState: T = {pointers: []};
export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        add(state: T, action: PayloadAction<Pointer<DCard>>){
            const pointer = action.payload;
            if(!state.pointers.includes(pointer)) state.pointers.push(pointer);
        },
        remove(state: T, action: PayloadAction<Pointer<DCard>>) {
            const pointer = action.payload;
            const index = state.pointers.indexOf(pointer);
            state.pointers.splice(index, 1);
        }
    }
});

export const cardReducer = cardSlice.reducer;
