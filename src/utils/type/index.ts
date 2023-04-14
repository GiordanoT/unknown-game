import {DPointer, LPointer} from "@/data/Pointer";
import {DLobby, LLobby} from "@/data/Lobby";
import {DUser, LUser} from "@/data/User";
import {DGame, LGame} from "@/data/Game";
import {DNamed, LNamed} from "@/data/Named";
import {DPlayer, LPlayer} from "@/data/Player";
import {DCard, LCard} from "@/data/Card";
import {DDeck, LDeck} from "@/data/Deck";

export type Pointer<T extends DPointer = DPointer> = string;
export type Dictionary<T> = {[key: string] : T};
export type DObject = DPointer|DNamed|DLobby|DUser|DGame|DPlayer|DCard|DDeck;
export type LObject = LPointer|LNamed|LLobby|LUser|LGame|LPlayer|LCard|LDeck;
export type Value = string|number|boolean|null|Value[];
export interface EDIT {obj: DObject, field: string, value: any}
type OPERATOR = '=='|'!=';
export interface CONSTRAINT<T> {field: keyof T, operator: OPERATOR, value: Value}

