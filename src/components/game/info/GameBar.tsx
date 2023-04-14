import React, {CSSProperties} from "react";
import {PGame} from "@/data/Game";
import {PUser} from "@/data/User";
import {PPlayer} from "@/data/Player";
import {U} from "@/utils/functions";

interface Props {user: PUser, player: null|PPlayer, game: PGame}
function GameBar(props: Props) {
    const user = props.user;
    const player = props.player;
    const game = props.game;
    const css: CSSProperties = {};
    if(U.retrieveSign(user.id) === player?.sign) css.bottom = 0;
    else css.top = 0

    return(<div style={css} className={'player-bar p-1'}>
        <label className={'cursor-default'} style={{color: (!game.winner) ? 'white' : (game.winner.id === player?.id) ? 'green' : 'red'}}>
            {(player) ? player.name : '???'}
        </label>
    </div>);
}
export default GameBar;
