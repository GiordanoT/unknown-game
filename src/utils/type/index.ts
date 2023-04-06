import {DLobby, DPointer, DUser} from "@/data";

export type Pointer<T extends DPointer = DPointer> = string;
export type Dictionary<T> = { [key: string] : T };
export type DObject = DLobby|DUser;
export type Value = string|number|boolean;
export interface EDIT {obj: DObject, field: keyof DObject, value: any}
type OPERATOR = '=='|'!=';
export interface CONSTRAINT<T> {field: keyof T, operator: OPERATOR, value: Value}

