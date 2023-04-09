import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {Action} from "@/utils/actions";
import {DNamed, LNamed, PNamed} from "@/data/Named";

///<reference path='Named.ts' />
export interface DUser extends DNamed {
    email: string
}

export class LUser extends LNamed implements DUser {
    classname = LUser.name;
    email: string;
    raw!: DUser;

    protected constructor(user: DUser) {
        const named: DNamed = {id: user.id, name: user.name};
        super(named);
        this.email = user.email;
    }
    static new(user: DUser): PUser {
        const obj = new LUser(user);
        return ProxyWrapper.wrap<PUser>(new Proxy(obj, ProxyWrapper.handler<LUser>()));
    }

    static fromPointer(pointer: Pointer<DUser>): PUser {
        const objects = store.getState().objects;
        const object = objects[pointer] as DUser;
        return LUser.new(object) as any;
    }
    setName(name: this['name']): void {super.setName(name, Action.Mixin);}
    getEmail(): this['email'] { return this.email; }
    setEmail(): void {}
}

export interface PUser extends PNamed {
    email: string
}
