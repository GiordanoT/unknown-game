import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {Action} from "@/utils/actions";
import {DNamed, LNamed, PNamed} from "@/data/Named";

///<reference path='Named.ts' />
export interface DGameCard extends DNamed {
    image: string;
}

export class LGameCard extends LNamed implements DGameCard {
    classname = LGameCard.name;
    image: string;
    raw!: DGameCard;

    protected constructor(dObj: DGameCard) {
        const named: DNamed = {id: dObj.id, name: dObj.name};
        super(named);
        this.image = dObj.image;
    }
    static new(dObj: DGameCard): PGameCard {
        const obj = new LGameCard(dObj);
        return ProxyWrapper.wrap<PGameCard>(new Proxy(obj, ProxyWrapper.handler<LGameCard>()));
    }

    static fromPointer(pointer: Pointer<DGameCard>): PGameCard {
        const objects = store.getState().objects;
        const object = objects[pointer] as DGameCard;
        return LGameCard.new(object);
    }
    setName(name: this['name']): void {super.setName(name, Action.Mixin);}

    getImage(): string {return this.image;}
}

export interface PGameCard extends PNamed {
    image: string;
}
