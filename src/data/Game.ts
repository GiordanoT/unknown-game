import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {DPointer, LPointer, PPointer} from "@/data/Pointer";
import {store} from "@/redux";
import {Action} from "@/utils/actions";
import {DPlayer, LPlayer, PPlayer} from "@/data/Player";

///<reference path='Pointer.ts' />
export interface DGame extends DPointer {
    code: string;
    playerOne: null|Pointer<DPlayer>;
    playerTwo: null|Pointer<DPlayer>;
    running: boolean;
    eliminable: boolean;
}

export class LGame extends LPointer implements DGame {
    classname = LGame.name;
    code: string;
    playerOne: null|Pointer<DPlayer>;
    playerTwo: null|Pointer<DPlayer>;
    running: boolean;
    eliminable: boolean;
    raw!: DGame;

    protected constructor(game: DGame) {
        const pointer: DPointer = {id: game.id}
        super(pointer);
        this.code = game.code;
        this.playerOne = game.playerOne;
        this.playerTwo = game.playerTwo;
        this.running = game.running;
        this.eliminable = game.eliminable;
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

    getCode(): string {return this.code;}
    setCode(value: string): void {
        this.code = value;
        Action.EDIT<DGame>(this.getRaw(), 'code', value, Action.Mixin);
    }

    getPlayerOne(): null|PPlayer {
        if(this.playerOne) return LPlayer.fromPointer(this.playerOne);
        else return null;
    }
    setPlayerOne(value: PPlayer): void {
        this.playerOne = value.id;
        Action.EDIT<DGame>(this.getRaw(), 'playerOne', value.id, Action.Mixin);
    }

    getPlayerTwo(): null|PPlayer {
        if(this.playerTwo) return LPlayer.fromPointer(this.playerTwo);
        else return null;
    }
    setPlayerTwo(value: PPlayer): void {
        this.playerTwo = value.id;
        Action.EDIT<DGame>(this.getRaw(), 'playerTwo', value.id, Action.Mixin);
    }

    getRunning(): boolean {return this.running;}
    setRunning(value: boolean): void {
        this.running = value;
        Action.EDIT<DGame>(this.getRaw(), 'running', value, Action.Mixin);
    }

    getEliminable(): boolean {return this.eliminable;}
    setEliminable(value: boolean): void {
        this.running = value;
        Action.EDIT<DGame>(this.getRaw(), 'eliminable', value, Action.Firebase);
    }

}

export interface PGame extends PPointer {
    code: string;
    playerOne: null|PPlayer;
    playerTwo: null|PPlayer;
    running: boolean;
    eliminable: boolean;
}
