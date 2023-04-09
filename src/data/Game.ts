import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {DPointer, LPointer, PPointer} from "@/data/Pointer";
import {store} from "@/redux";
import {Action} from "@/utils/actions";
import {DPlayer, LPlayer, PPlayer} from "@/data/Player";

///<reference path='Pointer.ts' />
export interface DGame extends DPointer {
    code: string,
    playerOne: null|Pointer<DPlayer>,
    playerTwo: null|Pointer<DPlayer>,
    running: boolean
}

export class LGame extends LPointer implements DGame {
    classname = LGame.name;
    code: string;
    playerOne: null|Pointer<DPlayer>;
    playerTwo: null|Pointer<DPlayer>;
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

    getPlayerOne(): null|PPlayer {
        if(this.playerOne) return LPlayer.fromPointer(this.playerOne);
        else return null;
    }
    setPlayerOne(player: PPlayer): void {
        this.playerOne = player.id;
        Action.EDIT<DGame>(this.getRaw(), 'playerOne', player.id, Action.Mixin);
    }

    getPlayerTwo(): null|PPlayer {
        if(this.playerTwo) return LPlayer.fromPointer(this.playerTwo);
        else return null;
    }
    setPlayerTwo(player: PPlayer): void {
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
    playerOne: null|PPlayer,
    playerTwo: null|PPlayer,
    running: boolean
}
