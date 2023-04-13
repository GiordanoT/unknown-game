import React, {useState} from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import Navbar from "@/components/common/Navbar";
import {DUser, LUser, PUser} from "@/data/User";
import {CONSTRAINT, Pointer} from "@/utils/type";
import {DGame, LGame, PGame} from "@/data/Game";
import {MixinAction} from "@/utils/actions";
import {FirebaseAction} from "@/firebase/actions";
import {U} from "@/utils/functions";
import {DPlayer, LPlayer} from "@/data/Player";
import {ReduxUtilityAction} from "@/redux/actions/utility";
import {ReduxAction} from "@/redux/actions";

function HomeComponent(props: AllProps) {
    const user = props.user;
    const game = props.game;
    const [gameCode, setGameCode] = useState('');

    const create = async() => {
        ReduxUtilityAction.setLoading(true);
        const dPlayer: DPlayer = {name: user.name, sign: U.retrieveSign(user.id)};
        const player = LPlayer.new(dPlayer);
        await MixinAction.add(player.raw);
        const dGame: DGame = {
            code: U.getRandomString(5),
            playerOne: player.id,
            playerTwo: null,
            running: false,
            eliminable: false
        };
        const pGame = LGame.new(dGame);
        await MixinAction.add(pGame.raw);
        user.role = 'playerOne';
        ReduxUtilityAction.setLoading(false);
    }

    const join = async() => {
        ReduxUtilityAction.setLoading(true);
        const constraint: CONSTRAINT<DGame> = {field: 'code', operator: '==', value: gameCode};
        const games = await FirebaseAction.select<DGame>('games', constraint);
        if(games.length > 0) {
            const dGame = games[0];
            if(!dGame.running) {
                const game = LGame.new(dGame);
                ReduxAction.add(game.raw);
                const dPlayer: DPlayer = {name: user.name, sign: U.retrieveSign(user.id)};
                const player = LPlayer.new(dPlayer);
                await MixinAction.add(player.raw);
                game.running = true; game.playerTwo = player;
                user.role = 'playerTwo';
                ReduxUtilityAction.setLoading(false);
            } else alert('game is running');
        } else alert('invalid gameID');
    }


    return(<div>
        <Navbar userID={user.id} />
        <div className={'card shadow mt-4 mx-auto'}>
            <label className={'d-block'}><b>GAME</b></label>
            <hr />
            <button className={'btn btn-primary mt-2'} onClick={create} disabled={game !== null}>Create</button>
            <label className={'d-block mt-2 mb-2'}>OR</label>
            <div className={'d-flex justify-content-center'}>
                <input className={'input'} onChange={(evt) => setGameCode(evt.target.value)} type={'text'} />
                <button className={'ms-1 btn btn-primary'} onClick={join} disabled={game !== null}>Join</button>
            </div>
        </div>
    </div>);


}

interface OwnProps {userID: Pointer<DUser>}
interface StateProps {user: PUser, game: null|PGame}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    const user = LUser.fromPointer(ownProps.userID);
    const gameID = state.game.pointer; let game: null|PGame = null;
    if(gameID) game = LGame.fromPointer(gameID);
    return {user, game};
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Home = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(HomeComponent);
export default Home;
