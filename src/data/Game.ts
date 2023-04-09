import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {DPointer, LPointer, PPointer} from "@/data/Pointer";
import {DUser, LUser, PUser} from "@/data/User";
import {store} from "@/redux";
import {Action} from "@/utils/actions";

///<reference path='Pointer.ts' />
export interface DGame extends DPointer {
    code: string,
    playerOne: Pointer<DUser>,
    playerTwo: null|Pointer<DUser>,
    running: boolean
}

export class LGame extends LPointer implements DGame {
    classname = LGame.name;
    code: string;
    playerOne: Pointer<DUser>;
    playerTwo: null|Pointer<DUser>;
    running: boolean;
    raw!: DGame;

    protected constructor(game: DGame) {
        const pointer: DPointer = {id: game.id}
        super(pointer);
        this.code = game.code;
        this.playerOne = game.playerOne;
        this.playerTwo = game.playerTwo;
        this.running = game.running;
    }
    static new(game: DGame): PGame {
        const obj = new LGame(game);
        return ProxyWrapper.wrap<PGame>(new Proxy(obj, ProxyWrapper.handler<LGame>()));
    }

    static fromPointer(pointer: Pointer<DGame>): PGame {
        const objects = store.getState().objects;
        const object = objects[pointer] as DGame;
        return LGame.new(object);
    }

    getPlayerOne(): PUser {return LUser.fromPointer(this.playerOne);}
    setPlayerOne(player: PUser): void {
        this.playerOne = player.id;
        Action.EDIT<DGame>(this.getRaw(), 'playerOne', player.id, Action.Mixin);
    }

    getPlayerTwo(): null|PUser {
        if(this.playerTwo) return LUser.fromPointer(this.playerTwo);
        else return null;
    }
    setPlayerTwo(player: PUser): void {
        this.playerTwo = player.id;
        Action.EDIT<DGame>(this.getRaw(), 'playerTwo', player.id, Action.Mixin);
    }

    getRunning(): this['running'] {return this.running;}
    setRunning(running: this['running']): void {
        this.running = running;
        Action.EDIT<DGame>(this.getRaw(), 'running', running, Action.Mixin);
    }

    getCode(): this['code'] {return this.code;}
    setCode(code: this['code']): void {
        this.code = code;
        Action.EDIT<DGame>(this.getRaw(), 'code', code, Action.Mixin);
    }
}

export interface PGame extends PPointer {
    code: string,
    playerOne: PUser,
    playerTwo: null|PUser,
    running: boolean
}
