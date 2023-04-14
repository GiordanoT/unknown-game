import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {Action} from "@/utils/actions";
import {DNamed, LNamed, PNamed} from "@/data/Named";
import {DCard, LCard, PCard} from "@/data/Card";

///<reference path='Named.ts' />
export interface DDeck extends DNamed {
    cards: Pointer<DCard>[];
}

export class LDeck extends LNamed implements DDeck {
    classname = LDeck.name;
    cards: Pointer<DCard>[];
    raw!: DDeck;

    protected constructor(dObj: DDeck) {
        const named: DNamed = {id: dObj.id, name: dObj.name};
        super(named);
        this.cards = dObj.cards;
    }
    static new(dObj: DDeck): PDeck {
        const obj = new LDeck(dObj);
        return ProxyWrapper.wrap<PDeck>(new Proxy(obj, ProxyWrapper.handler<LDeck>()));
    }

    static fromPointer(pointer: Pointer<DDeck>): PDeck {
        const objects = store.getState().objects;
        const object = objects[pointer] as DDeck;
        return LDeck.new(object);
    }
    setName(name: this['name']): void {super.setName(name, Action.Mixin);}

    getCards(): PCard[] {
        const cards: PCard[] = [];
        for(let pointer of this.cards) {
            const card = LCard.fromPointer(pointer);
            cards.push(card);
        }
        return cards;
    }
}

export interface PDeck extends PNamed {
    cards: PCard[];

}
