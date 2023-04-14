import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type T = {loading: boolean, firebaseListener: boolean, gameCode: string};
const initialState: T = {loading: false, firebaseListener: true, gameCode: ''};
export const utilitySlice = createSlice({
    name: 'utility',
    initialState,
    reducers: {
        loadingStart(state: T){state.loading = true},
        loadingEnd(state: T){state.loading = false},
        firebaseLoad(state: T){state.firebaseListener = true},
        firebaseUnload(state: T){state.firebaseListener = false},
        setGameCode(state: T, action: PayloadAction<string>){state.gameCode = action.payload},
    }
});

export const utilityReducer = utilitySlice.reducer;
