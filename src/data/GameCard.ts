import {Class, Faction, Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {Action, MixinAction} from "@/utils/actions";
import {DNamed, LNamed, PNamed} from "@/data/Named";
import {DAnimated, LAnimated, PAnimated} from "@/data/Animated";

///<reference path='Named.ts' />
export interface DGameCard extends DAnimated {
    image: string;
    class: Class;
    faction: Faction;
    level: number;
    atk: number;
    hp: number;
    speed: number;
}

export class LGameCard extends LAnimated implements DGameCard {
    classname = LGameCard.name;
    image: string;
    class: Class;
    faction: Faction;
    level: number;
    atk: number;
    hp: number;
    speed: number;
    raw!: DGameCard;

    protected constructor(dObj: DGameCard) {
        const animated: DAnimated = {id: dObj.id, name: dObj.name, animation: dObj.animation};
        super(animated);
        this.image = dObj.image;
        this.class = dObj.class;
        this.faction = dObj.faction;
        this.level = dObj.level;
        this.atk = dObj.atk;
        this.hp = dObj.hp;
        this.speed = dObj.speed;
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


    getImage(): string {return this.image}
    getClass(): Class {return this.class}
    getFaction(): Faction {return this.faction}
    getLevel(): number {return this.level}
    getAtk(): number {return this.atk}
    getHp(): number {return this.hp}
    getSpeed(): number {return this.speed}
}

export interface PGameCard extends PAnimated {
    image: string;
    class: Class;
    faction: Faction;
    level: number;
    atk: number;
    hp: number;
    speed: number;
    raw: DGameCard;
}
