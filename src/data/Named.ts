import {ProxyWrapper} from "@/utils/proxy";
import {U} from "@/utils/functions";
import {DPointer, LPointer} from "@/data/Pointer";
import {Action} from "@/utils/actions";

///<reference path='Pointer.ts' />
export interface DNamed extends DPointer {name: string;}
export class LNamed extends LPointer implements DNamed {
    classname = LNamed.name;
    name: string;
    raw!: DNamed;

    protected constructor(named: DNamed) {
        const pointer: DPointer = {id: named.id}
        super(pointer);
        this.name = named.name;
    }
    static new(named: DNamed): LNamed {
        const obj = new LNamed(named);
        return new Proxy(obj, ProxyWrapper.handler<LNamed>());
    }

    getName(): this['name'] {return this.name;}
    setName(name: this['name'], layer: number): void {
        this.name = name;
        Action.EDIT<DNamed>(this.getRaw(), 'name', name, layer);
    }

}
