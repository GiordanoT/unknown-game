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
import {store} from "@/redux";
import {utilitySlice} from "@/redux/store/utility";
import {cardSlice} from "@/redux/store/card";
import {LCard} from "@/data/Card";
import {LDeck} from "@/data/Deck";
import {deckSlice} from "@/redux/store/deck";
import {LGameCard} from "@/data/GameCard";
import {LGameDeck} from "@/data/GameDeck";

export class U {

    public static getSlice(obj: DObject): null|Slice {
        if(!obj) return null;
        switch(obj.classname) {
            case LLobby.name: return lobbySlice;
            case LUser.name: return userSlice;
            case LPlayer.name: return playerSlice;
            case LGame.name: return gameSlice;
            case LCard.name: return cardSlice;
            case LDeck.name: return deckSlice;
            default: return null;
        }
    }

    public static getCollection(value: string|DObject): null|string {
        if(typeof value === 'string') return U.fieldToCollection(value);
        else return U.objectToCollection(value);
    }

    private static objectToCollection(obj: DObject): null|string {
        if(!obj) return null;
        switch(obj.classname) {
            case LLobby.name: return 'lobbies';
            case LUser.name: return 'users';
            case LPlayer.name: return 'players';
            case LGame.name: return 'games';
            case LCard.name: return 'cards';
            case LDeck.name: return 'decks';
            case LGameCard.name: return store.getState().utility.gameCode + '_cards';
            case LGameDeck.name: return store.getState().utility.gameCode + '_decks';
            default: return null;
        }
    }

    private static fieldToCollection(field: string): null|string {
        switch(field) {
            case 'playerOne':
            case 'playerTwo': return 'players';
            case 'cards': return 'cards';
            case 'gameCards': return store.getState().utility.gameCode + '_cards';
            case 'deck': return 'decks';
            case 'gameDeck': return store.getState().utility.gameCode + '_decks';
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

    static async goto(router: NextRouter, path: string, delay: number = 0): Promise<void> {
        store.dispatch(utilitySlice.actions.loadingStart());
        await U.sleep(delay)
        await router.push('/' + path);
        store.dispatch(utilitySlice.actions.loadingEnd());
    }

    static opponentRole(role: string): 'playerOne'|'playerTwo' {
        if(role === 'playerOne') return 'playerTwo';
        else return 'playerOne';
    }
}
