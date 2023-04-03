import {DLobby, DUser} from "@/data";

export type Dictionary<T> = { [key: string] : T }
export type ActionObj = DLobby|DUser;
export type ActionValue = string|number|boolean;
export interface EDIT{obj: ActionObj, field: keyof ActionObj, value: any}
export interface SET{id: string, obj: ActionObj}

