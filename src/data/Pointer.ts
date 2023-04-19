import {Pointer} from "@/utils/type";
import {U} from "@/utils/functions";
import {ProxyWrapper} from "@/utils/proxy";
import {MixinAction} from "@/utils/actions";

export interface DPointer {
    id?: Pointer;
    classname?: string;
}

export class LPointer implements DPointer {
    classname = LPointer.name;
    id: Pointer;
    raw!: DPointer;

    protected constructor(dObj: DPointer) {
        this.id = (dObj.id) ? dObj.id : 'POINTER_' + Date.now() + '_' + U.getRandomString(5);
    }
    static new(dObj: DPointer): PPointer {
        const obj = new LPointer(dObj);
        return ProxyWrapper.wrap<PPointer>(new Proxy(obj, ProxyWrapper.handler<LPointer>()));
    }

    getId(): this['id'] {return this.id;}
    getRaw(): this['raw'] {return {...this};}

}

export interface PPointer {
    raw: DPointer;
    id: Pointer;
    classname: string;
}
