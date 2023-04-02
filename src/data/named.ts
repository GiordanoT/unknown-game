import {DPointer, LPointer} from "@/data/pointer";
import {ReduxAction} from "@/redux/actions";

export interface DNamed extends DPointer {
    name: string;
}

export class LNamed extends LPointer implements DNamed {
    classname = LNamed.name;
    name: string;

    constructor(name: string, id?: string) {
        super((id) ? id : undefined);
        this.name = name;
    }

    setName(name: string): void {
        this.name = name;
        ReduxAction.edit(this, 'name', this.name);
    }
    raw(): DNamed { return {...this}; }
}

