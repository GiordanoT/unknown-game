import {Action} from "@/utils/actions";
import {store} from "@/redux";
import {U} from "@/utils/functions";
import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";

/* POINTER */
export interface DPointer {id: Pointer; classname: string;}
export class LPointer implements DPointer {
    classname = LPointer.name;
    id: Pointer;
    raw!: DPointer;

    protected constructor(id?: Pointer) {
        this.id = (id) ? id : 'POINTER_' + Date.now() + '_' + U.getRandomString(5);
    }
    static new(id?: Pointer): LPointer {
        const obj = new LPointer(id);
        return new Proxy(obj, ProxyWrapper.handler<LPointer>());
    }
    getId(): this['id'] {return this.id;}
    getRaw(): this['raw'] {return {...this};}
}

/* NAMED */
export interface DNamed extends DPointer {name: string;}
export class LNamed extends LPointer implements DNamed {
    classname = LNamed.name;
    name: string;
    raw!: DNamed;

    protected constructor(name: string, id?: Pointer) {
        super((id) ? id : undefined);
        this.name = name;
    }
    static new(name: string, id?: Pointer): LNamed {
        const obj = new LNamed(name, id);
        return new Proxy(obj, ProxyWrapper.handler<LNamed>());
    }

    getName(): this['name'] {return this.name;}
    setName(name: this['name'], layer: number): void {
        this.name = name;
        U.actionSwitch(this.getRaw(), 'name', name, layer);
    }

    getRaw(): this['raw'] { return {...this}; }
}

/* LOBBY */
export interface DLobby extends DNamed {}
export class LLobby extends LNamed implements DLobby {
    classname = LLobby.name;
    raw!: DLobby;

    protected constructor(name: string, id?: Pointer) {
        super(name, (id) ? id : undefined);
    }
    static new(name: string, id?: Pointer): LLobby {
        const obj = new LLobby(name, id);
        return new Proxy(obj, ProxyWrapper.handler<LLobby>());
    }

    static fromPointer(pointer: Pointer<DLobby>): LLobby {
        const objects = store.getState().objects;
        const object = objects[pointer] as DLobby;
        return LLobby.new(object.name, object.id);
    }

    setName(name: this['name']): void {super.setName(name, Action.Mixin)}
    getRaw(): this['raw'] { return {...this}; }
}

/* USER */
export interface DUser extends DNamed {email: string}
export class LUser extends LNamed implements DUser {
    classname = LUser.name;
    email: string;
    raw!: DUser;

    protected constructor(name: string, email: string, id?: Pointer) {
        super(name, (id) ? id : undefined);
        this.email = email;
    }
    static new(name: string, email: string, id?: Pointer): LUser {
        const obj = new LUser(name, email, id);
        return new Proxy(obj, ProxyWrapper.handler<LUser>());
    }

    static fromPointer(pointer: Pointer<DUser>): LUser {
        const objects = store.getState().objects;
        const object = objects[pointer] as DUser;
        return LUser.new(object.name, object.email, object.id);
    }

    setName(name: this['name']): void {super.setName(name, Action.Mixin);}
    getEmail(): this['email'] { return this.email; }
    getRaw(): this['raw'] { return {...this}; }

}

