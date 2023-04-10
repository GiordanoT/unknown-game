import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Pointer} from "@/utils/type";
import {DLobby} from "@/data/Lobby";

type T = {pointers: Pointer<DLobby>[]};
const initialState: T = {pointers: []};
export const lobbySlice = createSlice({
    name: 'lobby',
    initialState,
    reducers: {
        add(state: T, action: PayloadAction<Pointer<DLobby>>){
            const pointer = action.payload;
            if(!state.pointers.includes(pointer)) state.pointers.push(pointer);
        },
        remove(state: T, action: PayloadAction<Pointer<DLobby>>) {
            const pointer = action.payload;
            const index = state.pointers.indexOf(pointer);
            state.pointers.splice(index, 1);
        }
    }
});

export const lobbyReducer = lobbySlice.reducer;
