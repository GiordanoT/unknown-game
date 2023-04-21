import {Class, Faction, Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {Action} from "@/utils/actions";
import {DNamed, LNamed, PNamed} from "@/data/Named";

///<reference path='Named.ts' />
export interface DCard extends DNamed {
    code: number;
    image: string;
    class: Class;
    faction: Faction;
    level: number;
    atk: number;
    hp: number;
    speed: number;
}

export class LCard extends LNamed implements DCard {
    classname = LCard.name;
    code: number;
    image: string;
    class: Class;
    faction: Faction;
    level: number;
    atk: number;
    hp: number;
    speed: number;
    raw!: DCard;

    protected constructor(dObj: DCard) {
        const named: DNamed = {id: dObj.id, name: dObj.name};
        super(named);
        this.code = dObj.code;
        this.image = dObj.image;
        this.class = dObj.class;
        this.faction = dObj.faction;
        this.level = dObj.level;
        this.atk = dObj.atk;
        this.hp = dObj.hp;
        this.speed = dObj.speed;
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

    getCode(): number {return this.code;}
    getImage(): string {return this.image;}
    getClass(): Class {return this.class}
    getFaction(): Faction {return this.faction}
    getLevel(): number {return this.level}
    getAtk(): number {return this.atk}
    getHp(): number {return this.hp}
    getSpeed(): number {return this.speed}
}

export interface PCard extends PNamed {
    code: number;
    image: string;
    class: Class;
    faction: Faction;
    level: number;
    atk: number;
    hp: number;
    speed: number;
}
