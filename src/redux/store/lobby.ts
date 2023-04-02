import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DLobby} from "@/data/lobby";
import {Dictionary} from "@/utils/type";


const initialState: { [id: string]: DLobby} = {};
interface EDIT { obj: DLobby, field: keyof DLobby, value: string|number|boolean }
export const lobbySlice = createSlice({
    name: 'lobby',
    initialState,
    reducers: {
        set(state: Dictionary<DLobby>, action: PayloadAction<DLobby[]>) {
            for(let pointer in state) { delete state[pointer]; }
            for(let lobby of action.payload) { state[lobby.id] = lobby; }
        },
        add(state: Dictionary<DLobby>, action: PayloadAction<DLobby>){
            const lobby = action.payload;
            state[lobby.id] = lobby;
        },
        remove(state: Dictionary<DLobby>, action: PayloadAction<DLobby>) {
            const lobby = action.payload;
            delete state[lobby.id];
        },
        edit(state: Dictionary<any>, action: PayloadAction<EDIT>) {
            const payload = action.payload;
            const lobby = payload.obj;
            const field = payload.field;
            state[lobby.id][field] = payload.value;
        }
    }
});

export const lobbyReducer = lobbySlice.reducer;
