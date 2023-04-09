import {Dictionary, DObject} from "@/utils/type";
import {ReduxAction} from "@/redux/actions";
import {Slice} from "@reduxjs/toolkit";
import {lobbySlice} from "@/redux/store/lobby";
import {userSlice} from "@/redux/store/user";
import {LLobby} from "@/data/Lobby";
import {LUser} from "@/data/User";
import {LGame} from "@/data/Game";
import {gameSlice} from "@/redux/store/game";

export class U {
    public static getSlice(obj: DObject): null|Slice {
        switch(obj.classname) {
            case LLobby.name: return lobbySlice;
            case LUser.name: return userSlice;
            case LGame.name: return gameSlice;
            default: return null;
        }
    }

    public static getCollection(obj: DObject): null|string {
        switch(obj.classname) {
            case LLobby.name: return 'lobbies';
            case LUser.name: return 'users';
            case LGame.name: return 'games';
            default: return null;
        }
    }

    public static getRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
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

    public static async sleep(seconds: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

}
