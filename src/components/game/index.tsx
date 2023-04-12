import React from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {DGame, LGame, PGame} from "@/data/Game";
import {MixinAction} from "@/utils/actions";
import Navbar from "@/components/common/Navbar";
import {Pointer} from "@/utils/type";
import {DUser, LUser, PUser} from "@/data/User";
import {FirebaseAction} from "@/firebase/actions";
import {useEffectOnce} from "usehooks-ts";

function GameComponent(props: AllProps) {
    const user = props.user;
    const game = props.game;

    useEffectOnce(() => {FirebaseAction.load('games', LGame.name, game.id).then();});

    const end = async() => {
        const player = game[user.role]; if(player) player.sign = '';
        await MixinAction.remove(game.raw);
        if(game.playerOne) await MixinAction.remove(game.playerOne.raw);
        if(game.playerTwo) await MixinAction.remove(game.playerTwo.raw);
    }

    return(<div>
        <Navbar userID={user.id} />
        <div><b>CODE:</b>{game.code}</div>
        <div><b>P1:</b>{game.playerOne?.name}</div>
        <div><b>P2:</b>{game.playerTwo?.name}</div>
        <button className={'btn btn-danger'} onClick={end}>BRUTAL DELETE</button>
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
