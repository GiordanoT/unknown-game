import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {Action} from "@/utils/actions";
import {DNamed, LNamed, PNamed} from "@/data/Named";

///<reference path='Named.ts' />
export interface DPlayer extends DNamed {
    sign: string;
}

export class LPlayer extends LNamed implements DPlayer {
    classname = LPlayer.name;
    sign: string;
    raw!: DPlayer;

    protected constructor(dObj: DPlayer) {
        const named: DNamed = {id: dObj.id, name: dObj.name};
        super(named);
        this.sign = dObj.sign;
    }
    static new(dObj: DPlayer): PPlayer {
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
}

export interface PPlayer extends PNamed {}
