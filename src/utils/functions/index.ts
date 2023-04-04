import {ActionObj, ActionValue, Dictionary} from "@/utils/type";
import {ReduxAction} from "@/redux/actions";

export class U {
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
    public static log(text: string, obj?: ActionObj|ActionObj[]): void {
        const debug = true;
        if(debug) {
            if(obj) console.log(text, obj);
            else console.log(text);
        }
    }
    public static delta(oldObject: ActionObj, newObject: ActionObj): void {
        const changes: Dictionary<any> = Object.entries(newObject).filter(([key, val]) => {
            return oldObject[key as keyof ActionObj] !== val && key in oldObject
        }).reduce((a, [key, v]) => ({...a, [key]: v}), {});
        for(let field in changes) ReduxAction.edit(oldObject, field as keyof ActionObj, changes[field]);
    }
}
