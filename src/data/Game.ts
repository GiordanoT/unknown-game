import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {DPointer, LPointer} from "@/data/Pointer";
import {DUser} from "@/data/User";

///<reference path='Pointer.ts' />
export interface DGame extends DPointer {
    owner: Pointer<DUser>,
    guest: null|Pointer<DUser>
}

export class LGame extends LPointer implements DGame {
    classname = LGame.name;
    owner: Pointer<DUser>;
    guest: null|Pointer<DUser>;
    raw!: DGame;

    protected constructor(game: DGame) {
        const pointer: DPointer = {id: game.id}
        super(pointer);
        this.owner = game.owner;
        this.guest = game.guest;
    }
    static new(game: DGame): LGame {
        const obj = new LGame(game);
        return new Proxy(obj, ProxyWrapper.handler<LGame>());
    }
}
