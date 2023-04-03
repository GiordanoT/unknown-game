import {ReduxAction} from "@/redux/actions";
import {FirebaseAction} from "@/firebase/actions";
import {MixinAction} from "@/utils/actions";
import {store} from "@/redux";

/* POINTER */
export interface DPointer {id: string; classname: string;}
export class LPointer implements DPointer {
    classname = LPointer.name;
    id: string;

    constructor(id?: string) {
        this.id = (id) ? id : 'POINTER_' + Date.now();
    }

    raw(): DPointer {return {...this};}
    toString(): string {return JSON.stringify(this);}
}

/* NAMED */
export interface DNamed extends DPointer {name: string;}
export class LNamed extends LPointer implements DNamed {
    classname = LNamed.name;
    name: string;

    constructor(name: string, id?: string) {
        super((id) ? id : undefined);
        this.name = name;
    }

    setName(name: string, layer: number): void {
        this.name = name;
        switch(layer) {
            case 0: ReduxAction.edit(this.raw(), 'name', this.name); break;
            case 1: FirebaseAction.edit(this.raw(), 'name', this.name); break;
            default: MixinAction.edit(this.raw(), 'name', this.name); break;
        }
    }
    raw(): DNamed { return {...this}; }
}

/* LOBBY */
export interface DLobby extends DNamed {}
export class LLobby extends LNamed implements DLobby {
    classname = LLobby.name;

    constructor(name: string, id?: string) {
        super(name, (id) ? id : undefined);
    }

    static fromPointer(pointer: string): LLobby {
        const objects = store.getState().objects;
        const object = objects[pointer] as DLobby;
        return new LLobby(object.name, object.id);
    }

    setName(name: string): void {super.setName(name, 1)}
    raw(): DLobby { return {...this}; }
}

/* USER */
export interface DUser extends DNamed {email: string}
export class LUser extends LNamed implements DUser {
    classname = LUser.name;
    email: string;

    constructor(name: string, email: string, id?: string) {
        super(name, (id) ? id : undefined);
        this.email = email;
    }

    static fromPointer(pointer: string): LUser {
        const objects = store.getState().objects;
        const object = objects[pointer] as DUser;
        return new LUser(object.name, object.email, object.id);
    }

    setName(name: string): void {super.setName(name, 2);}
    raw(): DUser { return {...this}; }

}

