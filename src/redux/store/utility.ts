import {createSlice} from "@reduxjs/toolkit";

type T = {loading: boolean, firebaseListener: boolean};
const initialState: T = {loading: false, firebaseListener: true};
export const utilitySlice = createSlice({
    name: 'utility',
    initialState,
    reducers: {
        loadingStart(state: T){state.loading = true},
        loadingEnd(state: T){state.loading = false},
        firebaseLoad(state: T){state.firebaseListener = true},
        firebaseUnload(state: T){state.firebaseListener = false}
    }
});

export const utilityReducer = utilitySlice.reducer;
