import React from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {DGame, LGame, PGame} from "@/data/Game";
import Navbar from "@/components/common/Navbar";
import {Pointer} from "@/utils/type";
import {DUser, LUser, PUser} from "@/data/User";
import {FirebaseAction} from "@/firebase/actions";
import {useEffectOnce} from "usehooks-ts";
import {ReduxUtilityAction} from "@/redux/actions/utility";
import {U} from "@/utils/functions";

function GameComponent(props: AllProps) {
    const user = props.user;
    const game = props.game;

    useEffectOnce(() => {FirebaseAction.load('games', LGame.name, game.id).then();});

    const end = async() => {
        ReduxUtilityAction.setLoading(true);
        ReduxUtilityAction.setFirebaseListener(false);
        const player = game[user.role]; if(player) player.sign = '';
        if(!game.eliminable) {
            game.eliminable = true;
            await U.sleep(1);
        }
        else {
            if(game.playerOne) await FirebaseAction.remove(game.playerOne.raw);
            if(game.playerTwo) await FirebaseAction.remove(game.playerTwo.raw);
            await FirebaseAction.remove(game.raw);
        }
        window.location.reload();
    }

    return(<div>
        <Navbar userID={user.id} />
        <div><b>CODE:</b>{game.code}</div>
        <div><b>P1:</b>{game.playerOne?.name}</div>
        <div><b>P2:</b>{game.playerTwo?.name}</div>
        <div><b>Eliminable:</b>{String(game.eliminable)}</div>
        <button className={'btn btn-danger'} onClick={end}>end</button>
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
