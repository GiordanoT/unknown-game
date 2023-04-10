import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {Action} from "@/utils/actions";
import {DNamed, LNamed, PNamed} from "@/data/Named";
import {DGame} from "@/data/Game";

///<reference path='Named.ts' />
export interface DUser extends DNamed {
    email: string;
    role: 'playerOne'|'playerTwo';
}

export class LUser extends LNamed implements DUser {
    classname = LUser.name;
    email: string;
    role: 'playerOne'|'playerTwo';
    raw!: DUser;

    protected constructor(user: DUser) {
        const named: DNamed = {id: user.id, name: user.name};
        super(named);
        this.email = user.email;
        this.role = user.role;
    }
    static new(user: DUser): PUser {
        const obj = new LUser(user);
        return ProxyWrapper.wrap<PUser>(new Proxy(obj, ProxyWrapper.handler<LUser>()));
    }

    static fromPointer(pointer: Pointer<DUser>): PUser {
        const objects = store.getState().objects;
        const object = objects[pointer] as DUser;
        return LUser.new(object);
    }
    setName(name: this['name']): void {super.setName(name, Action.Mixin);}

    getEmail(): string { return this.email; }

    getRole(): 'playerOne'|'playerTwo' {return this.role}
    setRole(value : 'playerOne'|'playerTwo'): void {
        this.role = value;
        Action.EDIT<DUser>(this.getRaw(), 'role', value, Action.Mixin);
    }
}

export interface PUser extends PNamed {
    email: string;
    role: 'playerOne'|'playerTwo';
}
