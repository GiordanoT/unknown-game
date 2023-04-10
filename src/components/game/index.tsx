import React, {useState} from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {DGame, LGame, PGame} from "@/data/Game";
import {Action} from "@/utils/actions";
import Navbar from "@/components/common/Navbar";
import {Pointer} from "@/utils/type";
import {DUser, LUser, PUser} from "@/data/User";
import {useRouter} from "next/router";
import {U} from "@/utils/functions";
import {FirebaseAction} from "@/firebase/actions";
import {useEffectOnce} from "usehooks-ts";

function GameComponent(props: AllProps) {
    const router = useRouter();
    const user = props.user;
    const game = props.game;
    const [isLoading, setLoading] = useState(true);

    useEffectOnce(() => {
        FirebaseAction.load('games', LGame.name, game.id).then(() => {
            setLoading(false);
        });
    });

    const end = async() => {
        U.goto(router, 'profile');
        const player = game[user.role]; if(player) player.sign = '';
        await U.sleep(2);
        if(game.eliminable) {
            if(game.playerOne) Action.REMOVE(game.playerOne.raw, Action.Mixin);
            if(game.playerTwo) Action.REMOVE(game.playerTwo.raw, Action.Mixin);
            Action.REMOVE(game.raw, Action.Mixin);
        } else {
            game.eliminable = true;
            if(game.playerOne) Action.REMOVE(game.playerOne.raw, Action.Redux);
            if(game.playerTwo) Action.REMOVE(game.playerTwo.raw, Action.Redux);
            Action.REMOVE(game.raw, Action.Redux);
        }
    }

    if(!isLoading) {
        return(<div>
            <Navbar userID={user.id} />
            <div><b>CODE:</b>{game.code}</div>
            <button className={'btn btn-danger'} onClick={end}>END</button>
        </div>);
    } else return(<div></div>);

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
