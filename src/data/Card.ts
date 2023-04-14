import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {Action} from "@/utils/actions";
import {DNamed, LNamed, PNamed} from "@/data/Named";

///<reference path='Named.ts' />
export interface DCard extends DNamed {
    image: string;
}

export class LCard extends LNamed implements DCard {
    classname = LCard.name;
    image: string;
    raw!: DCard;

    protected constructor(dObj: DCard) {
        const named: DNamed = {id: dObj.id, name: dObj.name};
        super(named);
        this.image = dObj.image;
    }
    static new(dObj: DCard): PCard {
        const obj = new LCard(dObj);
        return ProxyWrapper.wrap<PCard>(new Proxy(obj, ProxyWrapper.handler<LCard>()));
    }

    static fromPointer(pointer: Pointer<DCard>): PCard {
        const objects = store.getState().objects;
        const object = objects[pointer] as DCard;
        return LCard.new(object);
    }
    setName(name: this['name']): void {super.setName(name, Action.Mixin);}

    getImage(): string {return this.image;}
}

export interface PCard extends PNamed {
    image: string;
}
