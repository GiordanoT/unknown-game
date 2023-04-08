import {Pointer} from "@/utils/type";
import {ProxyWrapper} from "@/utils/proxy";
import {DPointer, LPointer} from "@/data/Pointer";
import {DUser} from "@/data/User";
import {store} from "@/redux";
import {Action} from "@/utils/actions";
import {DNamed} from "@/data/Named";

///<reference path='Pointer.ts' />
export interface DGame extends DPointer {
    playerOne: Pointer<DUser>,
    playerTwo: null|Pointer<DUser>,
    running: boolean
}

export class LGame extends LPointer implements DGame {
    classname = LGame.name;
    playerOne: Pointer<DUser>;
    playerTwo: null|Pointer<DUser>;
    running: boolean;
    raw!: DGame;

    protected constructor(game: DGame) {
        const pointer: DPointer = {id: game.id}
        super(pointer);
        this.playerOne = game.playerOne;
        this.playerTwo = game.playerTwo;
        this.running = game.running;
    }
    static new(game: DGame): LGame {
        const obj = new LGame(game);
        return new Proxy(obj, ProxyWrapper.handler<LGame>());
    }

    static fromPointer(pointer: Pointer<DGame>): LGame {
        const objects = store.getState().objects;
        const object = objects[pointer] as DGame;
        return LGame.new(object);
    }

    getPlayerOne(): this['playerOne'] {return this.playerOne;}
    setPlayerOne(player: this['playerOne']): void {
        this.playerOne = player;
        Action.EDIT<DGame>(this.getRaw(), 'playerOne', player, Action.Mixin);
    }

    getPlayerTwo(): this['playerTwo'] {return this.playerTwo;}
    setPlayerTwo(player: this['playerTwo']): void {
        this.playerTwo = player;
        Action.EDIT<DGame>(this.getRaw(), 'playerTwo', player, Action.Mixin);
    }

    getRunning(): this['running'] {return this.running;}
    setRunning(running: this['running']): void {
        this.running = running;
        Action.EDIT<DGame>(this.getRaw(), 'running', running, Action.Mixin);
    }
}
