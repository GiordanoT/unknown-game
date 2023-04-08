import {DPointer} from "@/data/Pointer";
import {DLobby} from "@/data/Lobby";
import {DUser} from "@/data/User";
import {DGame} from "@/data/Game";
import {DNamed} from "@/data/Named";

export type Pointer<T extends DPointer = DPointer> = string;
export type Dictionary<T> = { [key: string] : T };
export type DObject = DPointer|DNamed|DLobby|DUser|DGame;
export type Value = string|number|boolean|null;
export interface EDIT {obj: DObject, field: string, value: any}
type OPERATOR = '=='|'!=';
export interface CONSTRAINT<T> {field: keyof T, operator: OPERATOR, value: Value}

