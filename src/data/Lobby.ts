import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {store} from "@/redux";
import {DPointer, LPointer} from "@/data/Pointer";

///<reference path='Pointer.ts' />
export interface DLobby extends DPointer {}
export class LLobby extends LPointer implements DLobby {
    classname = LLobby.name;
    raw!: DLobby;

    protected constructor(lobby: DLobby) {
        const pointer: DPointer = {id: lobby.id}
        super(pointer);
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

}

