import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {Action, MixinAction} from "@/utils/actions";
import {DNamed, LNamed, PNamed} from "@/data/Named";
import {DGameDeck, LGameDeck, PGameDeck} from "@/data/GameDeck";

///<reference path='Named.ts' />
export interface DPlayer extends DNamed {
    sign: string;
    gameDeck: Pointer<DGameDeck>;
}

export class LPlayer extends LNamed implements DPlayer {
    classname = LPlayer.name;
    sign: string;
    gameDeck: Pointer<DGameDeck>;
    raw!: DPlayer;

    protected constructor(dObj: DPlayer) {
        const named: DNamed = {id: dObj.id, name: dObj.name};
        super(named);
        this.sign = dObj.sign;
        this.gameDeck = dObj.gameDeck;
    }
    static new(dObj: DPlayer): PPlayer {
        // if(!dObj) window.location.reload();
        const obj = new LPlayer(dObj);
        return ProxyWrapper.wrap<PPlayer>(new Proxy(obj, ProxyWrapper.handler<LPlayer>()));
    }

    static fromPointer(pointer: Pointer<DPlayer>): PPlayer {
        const objects = store.getState().objects;
        const object = objects[pointer] as DPlayer;
        return LPlayer.new(object);
    }
    setName(name: string): void {super.setName(name, Action.Mixin);}
    getSign(): string {return this.sign}
    setSign(sign: string): void {Action.EDIT<DPlayer>(this.getRaw(), 'sign', sign, Action.Mixin)}

    getGameDeck(): PGameDeck {return LGameDeck.fromPointer(this.gameDeck)}
    setGameDeck(obj: PGameDeck): void {
        this.gameDeck = obj.id;
        MixinAction.edit(this.getRaw(), 'gameDeck', obj.id).then();
    }
}

export interface PPlayer extends PNamed {
    sign: string;
    gameDeck: PGameDeck;
}
