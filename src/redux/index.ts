import {combineReducers} from "redux";
import {lobbyReducer} from "@/redux/store/lobby";
import {configureStore} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    lobbies: lobbyReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export const store = configureStore({reducer: rootReducer});
