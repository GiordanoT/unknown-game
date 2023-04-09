import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {DPointer, LPointer, PPointer} from "@/data/Pointer";

///<reference path='Pointer.ts' />
export interface DLobby extends DPointer {}
export class LLobby extends LPointer implements DLobby {
    classname = LLobby.name;
    raw!: DLobby;

    protected constructor(lobby: DLobby) {
        const pointer: DPointer = {id: lobby.id}
        super(pointer);
    }
    static new(lobby: DLobby): PLobby {
        const obj = new LLobby(lobby);
        return ProxyWrapper.wrap<PLobby>(new Proxy(obj, ProxyWrapper.handler<LLobby>()));
    }

    static fromPointer(pointer: Pointer<DLobby>): PLobby {
        const objects = store.getState().objects;
        const object = objects[pointer] as DLobby;
        return LLobby.new(object);
    }

}

export interface PLobby extends PPointer {}

