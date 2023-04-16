import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {DPointer, LPointer, PPointer} from "@/data/Pointer";
import {DGameCard, LGameCard, PGameCard} from "@/data/GameCard";
import {MixinAction} from "@/utils/actions";

///<reference path='Pointer.ts' />
export interface DGameHand extends DPointer {
    gameCards: Pointer<DGameCard>[]
}
export class LGameHand extends LPointer implements DGameHand {
    classname = LGameHand.name;
    gameCards: Pointer<DGameCard>[];
    raw!: DGameHand;

    protected constructor(dObj: DGameHand) {
        const pointer: DPointer = {id: dObj.id}
        super(pointer);
        this.gameCards = dObj.gameCards;
    }
    static new(dObj: DGameHand): PGameHand {
        const obj = new LGameHand(dObj);
        return ProxyWrapper.wrap<PGameHand>(new Proxy(obj, ProxyWrapper.handler<LGameHand>()));
    }

    static fromPointer(pointer: Pointer<DGameHand>): PGameHand {
        const objects = store.getState().objects;
        const object = objects[pointer] as DGameHand;
        return LGameHand.new(object);
    }

    getGameCards(): PGameCard[] {
        const cards: PGameCard[] = [];
        for(let pointer of this.gameCards) {
            const card = LGameCard.fromPointer(pointer);
            cards.push(card);
        }
        return cards;
    }

    async setAddCard(card: PGameCard): Promise<void> {
        const cards = [...this.gameCards, card.id];
        this.gameCards = cards;
        await MixinAction.edit(this.getRaw(), 'gameCards', cards);
    }

}

export interface PGameHand extends PPointer {
    gameCards: PGameCard[];
    addCard: PGameCard;
}

