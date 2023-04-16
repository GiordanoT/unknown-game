import React from "react";
import {PGame} from "@/data/Game";
import {PUser} from "@/data/User";
import {U} from "@/utils/functions";
import {ReduxUtilityAction} from "@/redux/actions/utility";
import {FirebaseAction} from "@/firebase/actions";
import Icon from "@/components/common/Icon";
import {Selector} from "@/redux/selector";

interface Props {user: PUser, game: PGame}
function GameInfo(props: Props) {
    const user = props.user;
    const game = props.game;

    const surrend = () => {
        const opponentRole = U.opponentRole(user.role);
        game.winner = game[opponentRole];
    }

    const exit = async() => {
        ReduxUtilityAction.setLoading(true);
        ReduxUtilityAction.setFirebaseListener(false);
        const player = game[user.role]; if(player) player.sign = '';
        if(!game.eliminable && false) {
            game.eliminable = true;
            await U.sleep(1);
        }
        else {

            if(game.playerOne) {
                for(let gameCard of game.playerOne.gameDeck.gameCards) await FirebaseAction.remove(gameCard.raw);
                await FirebaseAction.remove(game.playerOne.gameDeck.raw);
                await FirebaseAction.remove(game.playerOne.gameHand.raw);
                await FirebaseAction.remove(game.playerOne.raw);
            }
            if(game.playerTwo){
                for(let gameCard of game.playerTwo.gameDeck.gameCards) await FirebaseAction.remove(gameCard.raw);
                await FirebaseAction.remove(game.playerTwo.gameDeck.raw);
                await FirebaseAction.remove(game.playerTwo.gameHand.raw);
                await FirebaseAction.remove(game.playerTwo.gameHand.raw);
                await FirebaseAction.remove(game.playerTwo.raw);
            }

            for(let card of Selector.getGameCards()) await FirebaseAction.remove(card);
            await FirebaseAction.remove(game.raw);
        }
        window.location.reload();
    }

    return(<div className={'widget shadow end-0 top-0 m-2'}>
        <div className={'d-block text-center'}>
            <b className={'cursor-default me-1'}>CODE:</b>
            <label className={'cursor-text'}>{game.code}</label>
        </div>
        <hr />
        <audio controls={true} autoPlay={true} loop={true}>
            {/*<source src={'music/background.mp3'} type={'audio/mp3'} />*/}
        </audio>
        <hr />
        <div className={'d-flex mx-1'}>
            <button className={'p-1 btn btn-danger'} onClick={surrend} disabled={game.winner !== null}>
                <Icon code={'407737'} name={'white-flag'} />
            </button>
            <button className={'p-1 btn btn-danger ms-auto'} onClick={exit} disabled={game.winner === null && false}>
                <Icon code={'288951'} name={'exit'} />
            </button>
        </div>
    </div>);
}
export default GameInfo;
