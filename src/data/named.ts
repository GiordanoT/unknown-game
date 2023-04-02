import {DPointer, LPointer} from "@/data/pointer";
import {MixinAction} from "@/utils/actions";

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
        MixinAction.edit(this.raw(), 'name', this.name);
    }
    raw(): DNamed { return {...this}; }
}

