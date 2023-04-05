import {DLobby, DPointer, DUser} from "@/data";

export type Pointer<T extends DPointer = DPointer> = string;
export type Dictionary<T> = { [key: string] : T }
export type ActionObj = DLobby|DUser;
export type ActionValue = string|number|boolean;
export interface EDIT{obj: ActionObj, field: keyof ActionObj, value: any}
