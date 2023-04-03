import {ActionObj, Dictionary} from "@/utils/type";

export class U {
    public static getID(dict: Dictionary<ActionObj>): null|string {
        const keys = Object.keys(dict);
        if(keys.length > 0) return keys[0];
        return null;
    }
}
