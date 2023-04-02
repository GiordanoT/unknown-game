import {combineReducers} from "redux";
import {lobbyReducer} from "@/redux/store/lobby";
import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "@/redux/store/user";

export const rootReducer = combineReducers({
    lobbies: lobbyReducer,
    users: userReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export const store = configureStore({reducer: rootReducer});
