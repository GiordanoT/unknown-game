import {ProxyWrapper} from "@/utils/proxy";
import {DPointer, LPointer, PPointer} from "@/data/Pointer";
import {Action} from "@/utils/actions";

///<reference path='Pointer.ts' />
export interface DNamed extends DPointer {
    name: string;
}

export class LNamed extends LPointer implements DNamed {
    classname = LNamed.name;
    name: string;
    raw!: DNamed;

    protected constructor(dObj: DNamed) {
        const pointer: DPointer = {id: dObj.id}
        super(pointer);
        this.name = dObj.name;
    }
    static new(dObj: DNamed): PNamed {
        const obj = new LNamed(dObj);
        return ProxyWrapper.wrap<PNamed>(new Proxy(obj, ProxyWrapper.handler<LNamed>()));
    }

    getName(): this['name'] {return this.name;}
    setName(name: this['name'], layer: number): void {
        this.name = name;
        Action.EDIT<DNamed>(this.getRaw(), 'name', name, layer);
    }

}

export interface PNamed extends PPointer {
    name: string;
}
