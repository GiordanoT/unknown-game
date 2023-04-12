import {createSlice} from "@reduxjs/toolkit";

type T = {loading: boolean};
const initialState: T = {loading: false};
export const utilitySlice = createSlice({
    name: 'utility',
    initialState,
    reducers: {
        loadingStart(state: T){state.loading = true},
        loadingEnd(state: T){state.loading = false}
    }
});

export const utilityReducer = utilitySlice.reducer;
