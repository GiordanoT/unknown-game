import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {Action} from "@/utils/actions";
import {DNamed, LNamed, PNamed} from "@/data/Named";
import {DGame} from "@/data/Game";
import {DDeck, LDeck, PDeck} from "@/data/Deck";

///<reference path='Named.ts' />
export interface DUser extends DNamed {
    email: string;
    role: 'playerOne'|'playerTwo';
    deck: Pointer<DDeck>;
}

export class LUser extends LNamed implements DUser {
    classname = LUser.name;
    email: string;
    role: 'playerOne'|'playerTwo';
    deck: Pointer<DDeck>;
    raw!: DUser;

    protected constructor(dObj: DUser) {
        const named: DNamed = {id: dObj.id, name: dObj.name};
        super(named);
        this.email = dObj.email;
        this.role = dObj.role;
        this.deck = dObj.deck;
    }
    static new(dObj: DUser): PUser {
        const obj = new LUser(dObj);
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

    getDeck(): PDeck {return LDeck.fromPointer(this.deck);}
}

export interface PUser extends PNamed {
    email: string;
    role: 'playerOne'|'playerTwo';
    deck: PDeck;
}
