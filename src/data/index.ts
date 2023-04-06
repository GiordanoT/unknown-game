import {FirebaseAction} from "@/firebase/actions";
import {Action, MixinAction} from "@/utils/actions";
import {store} from "@/redux";
import {U} from "@/utils/functions";
import {Pointer} from "@/utils/type";
import {ReduxObjAction} from "@/redux/actions/object";

/* POINTER */
export interface DPointer {id: Pointer; classname: string;}
export class LPointer implements DPointer {
    classname = LPointer.name;
    id: Pointer;

    constructor(id?: Pointer) {
        this.id = (id) ? id : 'POINTER_' + Date.now() + '_' + U.getRandomString(5);
    }

    raw(): DPointer {return {...this};}
    toString(): string {return JSON.stringify(this);}
}

/* NAMED */
export interface DNamed extends DPointer {name: string;}
export class LNamed extends LPointer implements DNamed {
    classname = LNamed.name;
    name: string;

    constructor(name: string, id?: Pointer) {
        super((id) ? id : undefined);
        this.name = name;
    }

    setName(name: string, layer: number): void {
        this.name = name;
        U.actionSwitch(this.raw(), 'name', name, layer);
    }

    raw(): DNamed { return {...this}; }
}

/* LOBBY */
export interface DLobby extends DNamed {}
export class LLobby extends LNamed implements DLobby {
    classname = LLobby.name;

    constructor(name: string, id?: Pointer) {
        super(name, (id) ? id : undefined);
    }

    static fromPointer(pointer: string): LLobby {
        const objects = store.getState().objects;
        const object = objects[pointer] as DLobby;
        return new LLobby(object.name, object.id);
    }

    setName(name: string): void {super.setName(name, Action.Mixin)}
    raw(): DLobby { return {...this}; }
}

/* USER */
export interface DUser extends DNamed {email: string}
export class LUser extends LNamed implements DUser {
    classname = LUser.name;
    email: string;

    constructor(name: string, email: string, id?: Pointer) {
        super(name, (id) ? id : undefined);
        this.email = email;
    }

    static fromPointer(pointer: string): LUser {
        const objects = store.getState().objects;
        const object = objects[pointer] as DUser;
        return new LUser(object.name, object.email, object.id);
    }

    setName(name: string): void {super.setName(name, Action.Mixin);}
    raw(): DUser { return {...this}; }

}

