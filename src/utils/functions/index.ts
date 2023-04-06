import {Dictionary, DObject, Value} from "@/utils/type";
import {ReduxAction} from "@/redux/actions";
import {Slice} from "@reduxjs/toolkit";
import {LLobby, LUser} from "@/data";
import {lobbySlice} from "@/redux/store/lobby";
import {userSlice} from "@/redux/store/user";
import {FirebaseAction} from "@/firebase/actions";
import {MixinAction} from "@/utils/actions";

export class U {
    public static getSlice(obj: DObject): null|Slice {
        switch(obj.classname) {
            case LLobby.name: return lobbySlice;
            case LUser.name: return userSlice;
            default: return null;
        }
    }

    public static getCollection(obj: DObject): null|string {
        switch(obj.classname) {
            case LLobby.name: return 'lobbies';
            case LUser.name: return 'users';
            default: return null;
        }
    }

    public static actionSwitch(obj: DObject, field: keyof DObject, value: Value, layer: number): void {
        switch(layer) {
            case 0: ReduxAction.edit(obj, field, value); break;
            case 1: FirebaseAction.edit(obj, field, value); break;
            default: MixinAction.edit(obj, field, value); break;
        }
    }

    public static getRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomString = '';
        let index = 0;
        while(index < length) {
            const randomNumber = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomNumber);
            index += 1;
        }
        return randomString;
    }
    public static log(text: string, obj?: DObject|DObject[]): void {
        const debug = true;
        if(debug) {
            if(obj) console.log(text, obj);
            else console.log(text);
        }
    }
    public static delta(oldObject: DObject, newObject: DObject): void {
        const changes: Dictionary<any> = Object.entries(newObject).filter(([key, val]) => {
            return oldObject[key as keyof DObject] !== val && key in oldObject
        }).reduce((a, [key, v]) => ({...a, [key]: v}), {});
        for(let field in changes) ReduxAction.edit(oldObject, field as keyof DObject, changes[field]);
    }
}
