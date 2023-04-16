import React from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {DGame, LGame, PGame} from "@/data/Game";
import {Pointer} from "@/utils/type";
import {DUser, LUser, PUser} from "@/data/User";
import {FirebaseAction} from "@/firebase/actions";
import {useEffectOnce} from "usehooks-ts";
import GameInfo from "@/components/game/info/GameInfo";
import GameBar from "@/components/game/info/GameBar";
import {LGameCard} from "@/data/GameCard";
import {LGameDeck} from "@/data/GameDeck";
import Card from "@/components/game/cards/Card";
import Hand from "@/components/game/cards/Hand";
import {LGameHand} from "@/data/GameHand";
import Deck from "@/components/game/cards/Deck";

function GameComponent(props: AllProps) {
    const user = props.user;
    const game = props.game;

    const card = game.playerOne?.gameDeck.gameCards[0];


    useEffectOnce(() => {
        FirebaseAction.load('games', LGame.name, game.id).then();
        FirebaseAction.load(game.code + '_cards', LGameCard.name).then();
        FirebaseAction.load(game.code + '_decks', LGameDeck.name).then();
        FirebaseAction.load(game.code + '_hands', LGameHand.name).then();
    });

    const draw = async () => {
        const player = game[user.role];
        if(player) await (game.draw = player);
    }

    return(<div>
        <GameInfo user={user} game={game} />
        <GameBar user={user} player={game.playerOne} game={game} />
        <GameBar user={user} player={game.playerTwo} game={game} />
        <button className={'m-5 p-5'} onClick={draw}>DRAW</button>
        {game.playerOne && <Hand hand={game.playerOne.gameHand} /> }
        {game.playerOne && <Deck deck={game.playerOne.gameDeck} /> }
    </div>);


}

interface OwnProps {userID: Pointer<DUser>, gameID: Pointer<DGame>}
interface StateProps {user: PUser, game: PGame}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    const user = LUser.fromPointer(ownProps.userID);
    const game = LGame.fromPointer(ownProps.gameID);
    return {user, game};
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Game = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(GameComponent);
export default Game;
