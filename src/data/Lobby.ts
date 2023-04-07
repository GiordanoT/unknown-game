import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {Action} from "@/utils/actions";
import {DNamed, LNamed} from "@/data/Named";
import {DPointer} from "@/data/Pointer";

///<reference path='Named.ts' />
export interface DLobby extends DNamed {}
export class LLobby extends LNamed implements DLobby {
    classname = LLobby.name;
    raw!: DLobby;

    protected constructor(lobby: DLobby) {
        const named: DNamed = {id: lobby.id, name: lobby.name}
        super(named);
    }
    static new(lobby: DLobby): LLobby {
        const obj = new LLobby(lobby);
        return new Proxy(obj, ProxyWrapper.handler<LLobby>());
    }

    static fromPointer(pointer: Pointer<DLobby>): LLobby {
        const objects = store.getState().objects;
        const object = objects[pointer] as DLobby;
        return LLobby.new(object);
    }

    setName(name: this['name']): void {super.setName(name, Action.Mixin)}
}

