import React from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {DGame, LGame, PGame} from "@/data/Game";
import {Pointer} from "@/utils/type";
import {DUser, LUser, PUser} from "@/data/User";
import {FirebaseAction} from "@/firebase/actions";
import {useEffectOnce} from "usehooks-ts";
import GameInfo from "@/components/game/GameInfo";
import GameBar from "@/components/game/GameBar";

function GameComponent(props: AllProps) {
    const user = props.user;
    const game = props.game;

    useEffectOnce(() => {
        FirebaseAction.load('games', LGame.name, game.id).then();
    });

    return(<div>
        <GameInfo user={user} game={game} />
        <GameBar user={user} player={game.playerOne} game={game} />
        <GameBar user={user} player={game.playerTwo} game={game} />
        {game.winner?.name}
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
