import {DPointer} from "@/data/pointer";
import {DNamed} from "@/data/named";
import {DLobby} from "@/data/lobby";

export type Dictionary<T> = { [key: string] : T }
export type ActionObj = DPointer|DNamed|DLobby;
export type ActionValue = string|number|boolean;
