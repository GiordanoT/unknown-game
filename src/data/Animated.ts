import {Animation, Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {DNamed, LNamed, PNamed} from "@/data/Named";
import {MixinAction} from "@/utils/actions";

///<reference path='Named.ts' />
export interface DAnimated extends DNamed {
    animation: Animation;
}

export class LAnimated extends LNamed implements DAnimated {
    static duration: number = 0.5;
    classname = LAnimated.name;
    animation: Animation;
    raw!: DAnimated;

    protected constructor(dObj: DAnimated) {
        const named: DNamed = {id: dObj.id, name: dObj.name};
        super(named);
        this.animation = dObj.animation;
    }
    static new(dObj: DAnimated): PAnimated {
        const obj = new LAnimated(dObj);
        return ProxyWrapper.wrap<PAnimated>(new Proxy(obj, ProxyWrapper.handler<LAnimated>()));
    }

    static fromPointer(pointer: Pointer<DAnimated>): PAnimated {
        const objects = store.getState().objects;
        const object = objects[pointer] as DAnimated;
        return LAnimated.new(object);
    }

    getAnimation(): Animation {return this.animation}
    async setAnimation(value: Animation): Promise<void> {
        this.animation = value;
        await MixinAction.edit(this.getRaw(), 'animation', value);
    }
}

export interface PAnimated extends PNamed {
    animation: Animation;
}
