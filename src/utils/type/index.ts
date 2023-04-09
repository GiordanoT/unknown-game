import {DPointer, LPointer} from "@/data/Pointer";
import {DLobby, LLobby} from "@/data/Lobby";
import {DUser, LUser} from "@/data/User";
import {DGame, LGame} from "@/data/Game";
import {DNamed, LNamed} from "@/data/Named";

export type Pointer<T extends DPointer = DPointer> = string;
export type Dictionary<T> = { [key: string] : T };
export type DObject = DPointer|DNamed|DLobby|DUser|DGame;
export type LObject = LPointer|LNamed|LLobby|LUser|LGame;
export type Value = string|number|boolean|null;
export interface EDIT {obj: DObject, field: string, value: any}
type OPERATOR = '=='|'!=';
export interface CONSTRAINT<T> {field: keyof T, operator: OPERATOR, value: Value}

