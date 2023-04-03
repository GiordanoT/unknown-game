import {combineReducers} from "redux";
import {lobbyReducer} from "@/redux/store/lobby";
import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "@/redux/store/user";
import {objectReducer} from "@/redux/store/object";

export const rootReducer = combineReducers({
    objects: objectReducer,
    lobbies: lobbyReducer,
    user: userReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export const store = configureStore({reducer: rootReducer});
