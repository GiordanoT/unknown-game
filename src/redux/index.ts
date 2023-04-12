import {combineReducers} from "redux";
import {lobbyReducer} from "@/redux/store/lobby";
import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "@/redux/store/user";
import {objectReducer} from "@/redux/store/object";
import {gameReducer} from "@/redux/store/game";
import {playerReducer} from "@/redux/store/player";
import {utilityReducer} from "@/redux/store/utility";

export const rootReducer = combineReducers({
    utility: utilityReducer,
    objects: objectReducer,
    lobbies: lobbyReducer,
    user: userReducer,
    players: playerReducer,
    game: gameReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export const store = configureStore({reducer: rootReducer});
