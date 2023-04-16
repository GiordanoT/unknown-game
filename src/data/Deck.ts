import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {Action} from "@/utils/actions";
import {DNamed, LNamed, PNamed} from "@/data/Named";
import {DCard, LCard, PCard} from "@/data/Card";
import {ReduxAction} from "@/redux/actions";

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

    getShuffle(): void {
        const deck = [...this.cards];
        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        this.cards = deck;
        ReduxAction.edit(this.getRaw(), 'cards', deck);
    }

}

export interface PDeck extends PNamed {
    cards: PCard[];
    shuffle: void;
}
