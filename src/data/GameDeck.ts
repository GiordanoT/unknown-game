import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {Action, MixinAction} from "@/utils/actions";
import {DNamed, LNamed, PNamed} from "@/data/Named";
import {DGameCard, LGameCard, PGameCard} from "@/data/GameCard";

///<reference path='Named.ts' />
export interface DGameDeck extends DNamed {
    gameCards: Pointer<DGameCard>[];
}

export class LGameDeck extends LNamed implements DGameDeck {
    classname = LGameDeck.name;
    gameCards: Pointer<DGameCard>[];
    raw!: DGameDeck;

    protected constructor(dObj: DGameDeck) {
        const named: DNamed = {id: dObj.id, name: dObj.name};
        super(named);
        this.gameCards = dObj.gameCards;
    }
    static new(dObj: DGameDeck): PGameDeck {
        const obj = new LGameDeck(dObj);
        return ProxyWrapper.wrap<PGameDeck>(new Proxy(obj, ProxyWrapper.handler<LGameDeck>()));
    }

    static fromPointer(pointer: Pointer<DGameDeck>): PGameDeck {
        const objects = store.getState().objects;
        const object = objects[pointer] as DGameDeck;
        return LGameDeck.new(object);
    }
    setName(name: this['name']): void {super.setName(name, Action.Mixin);}

    getGameCards(): PGameCard[] {
        const cards: PGameCard[] = [];
        for(let pointer of this.gameCards) {
            const card = LGameCard.fromPointer(pointer);
            cards.push(card);
        }
        return cards;
    }

    async getDraw(): Promise<null|PGameCard> {
        const cards = [...this.gameCards];
        const card = cards.pop();
        if(card) {
            this.gameCards = cards;
            await MixinAction.edit(this.getRaw(), 'gameCards', cards);
            return LGameCard.fromPointer(card);
        }
        else return null;
    }
}

export interface PGameDeck extends PNamed {
    gameCards: PGameCard[];

    draw: Promise<null|PGameCard>;
}
