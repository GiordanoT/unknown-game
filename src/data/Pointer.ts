import {Pointer} from "@/utils/type";
import {U} from "@/utils/functions";
import {ProxyWrapper} from "@/utils/proxy";

export interface DPointer {id?: Pointer; classname?: string;}
export class LPointer implements DPointer {
    classname = LPointer.name;
    id: Pointer;
    raw!: DPointer;

    protected constructor(pointer: DPointer) {
        this.id = (pointer.id) ? pointer.id : 'POINTER_' + Date.now() + '_' + U.getRandomString(5);
    }
    static new(pointer: DPointer): LPointer {
        const obj = new LPointer(pointer);
        return new Proxy(obj, ProxyWrapper.handler<LPointer>());
    }

    getId(): this['id'] {return this.id;}
    getRaw(): this['raw'] {return {...this};}
}
