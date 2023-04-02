import {DNamed, LNamed} from "./named";
import {store} from "@/redux";

export interface DLobby extends DNamed { }

export class LLobby extends LNamed implements DLobby {
    classname = LLobby.name;

    constructor(name: string, id?: string) {
        super(name, (id) ? id : undefined);
    }

    static fromPointer(pointer: string): LLobby {
        const servers = store.getState().lobbies;
        const server = servers[pointer];
        return new LLobby(server.name, server.id);
    }

    setName(name: string): void { super.setName(name); }
    raw(): DLobby { return {...this}; }
}
