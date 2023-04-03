import {DPointer, DNamed, DLobby, DUser} from "@/data";

export type Dictionary<T> = { [key: string] : T }
export type ActionObj = DPointer|DNamed|DLobby|DUser;
export type ActionValue = string|number|boolean;
export interface EDIT<T extends DPointer>{obj: T, field: keyof T, value: any}

