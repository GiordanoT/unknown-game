import {combineReducers} from "redux";
import {lobbyReducer} from "@/redux/store/lobby";
import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "@/redux/store/user";
import {objectReducer} from "@/redux/store/object";
import {gameReducer} from "@/redux/store/game";
import {playerReducer} from "@/redux/store/player";

export const rootReducer = combineReducers({
    objects: objectReducer,
    lobbies: lobbyReducer,
    user: userReducer,
    players: playerReducer,
    game: gameReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export const store = configureStore({reducer: rootReducer});
