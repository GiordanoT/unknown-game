import {ActionObj, Dictionary} from "@/utils/type";

export class U {
    public static getID(dict: Dictionary<ActionObj>): string {
        return Object.keys(dict)[0];
    }
}
