import {Dictionary, DObject, Value} from "@/utils/type";
import {ReduxAction} from "@/redux/actions";
import {Slice} from "@reduxjs/toolkit";
import {lobbySlice} from "@/redux/store/lobby";
import {userSlice} from "@/redux/store/user";
import {LLobby} from "@/data/Lobby";
import {LUser} from "@/data/User";
import {LGame} from "@/data/Game";
import {gameSlice} from "@/redux/store/game";
import {NextRouter} from "next/router";
import {playerSlice} from "@/redux/store/player";
import {LPlayer} from "@/data/Player";

export class U {

    public static getSlice(obj: DObject, field: string = ''): null|Slice {
        switch(obj.classname) {
            case LLobby.name: return lobbySlice;
            case LUser.name: return userSlice;
            case LPlayer.name: return playerSlice;
            case LGame.name: return gameSlice;
            default: return null;
        }
    }

    public static getCollection(value: string|DObject): null|string {
        if(typeof value === 'string') return U.fieldToCollection(value);
        else return U.objectToCollection(value);
    }

    private static objectToCollection(obj: DObject): null|string {
        switch(obj.classname) {
            case LLobby.name: return 'lobbies';
            case LUser.name: return 'users';
            case LPlayer.name: return 'players';
            case LGame.name: return 'games';
            default: return null;
        }
    }

    private static fieldToCollection(field: string): null|string {
        switch(field) {
            case 'playerOne': return 'players';
            case 'playerTwo': return 'players';
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
        const changes: Dictionary<Value> = Object.entries(newObject).filter(([key, val]) => {
            return oldObject[key as keyof DObject] !== val && key in oldObject
        }).reduce((a, [key, v]) => ({...a, [key]: v}), {});
        for(let field in changes) ReduxAction.edit(oldObject, field as keyof DObject, changes[field]);
    }

    public static async sleep(seconds: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    public static isPointer(value: string): boolean {
        const fields = value.split('_');
        if(fields.length === 3) {
            const pointer = fields[0];
            const timestamp = fields[1];
            const sign = fields[2];
            return pointer === 'POINTER' && timestamp.length === 13 && sign.length === 5;
        } else return false;
    }

    public static retrieveSign(value: string): string {
        const fields = value.split('_');
        if(fields.length === 3) {
            const sign = fields[2];
            return sign;
        } return '';
    }

    public static goto(router: NextRouter, path: string): void {
        router.push('/' + path).then()
    }

}
