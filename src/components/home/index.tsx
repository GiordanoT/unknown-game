import React, {useEffect, useState} from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import Navbar from "@/components/common/Navbar";
import {DUser, LUser} from "@/data/User";
import {CONSTRAINT, Pointer} from "@/utils/type";
import {DGame, LGame} from "@/data/Game";
import {Action} from "@/utils/actions";
import {FirebaseAction} from "@/firebase/actions";

function HomeComponent(props: AllProps) {
    const user = props.user;
    const game = props.game;
    const [gameID, setGameID] = useState('');

    useEffect(() => {
        if(game) FirebaseAction.load('games', LGame.name, game.id);
    })

    const create = () => {
        const dGame: DGame = {playerOne: user.id, playerTwo: null, running: false};
        const lGame = LGame.new(dGame);
        Action.ADD(lGame.raw, Action.Mixin);
        setGameID(lGame.id);
    }
    const join = async() => {
        const constraint: CONSTRAINT<DGame> = {field: 'id', operator: '==', value: gameID};
        const games = await FirebaseAction.select<DGame>('games', constraint);
        if(games.length > 0) {
            const dGame = games[0];
            if(!dGame.running) {
                const lGame = LGame.new(dGame);
                Action.ADD(lGame.raw, Action.Redux);
                lGame.running = true; lGame.playerTwo = user.id;
            } else alert('game is running');
        } else alert('invalid gameID');
    }

    if(game && game.running) {
        return(<div>
            Game
            <button className={'btn btn-danger'} onClick={() => Action.REMOVE(game.raw, Action.Mixin)}>END</button>
        </div>);
    } else {
        return(<div>
            <Navbar />
            <div className={'card shadow mt-4 mx-auto'}>
                <label className={'d-block'}><b>GAME</b></label>
                <hr />
                <button className={'btn btn-primary mt-2'} onClick={create} disabled={game !== null}>Create</button>
                <label className={'d-block mt-2 mb-2'}>OR</label>
                <div className={'d-flex justify-content-center'}>
                    <input value={gameID} className={'input'} onChange={(evt) => setGameID(evt.target.value)} type={'text'} />
                    <button className={'ms-1 btn btn-primary'} onClick={join} disabled={game !== null}>Join</button>
                </div>
            </div>
        </div>);
    }

}

interface OwnProps {userID: Pointer<DUser>}
interface StateProps {user: LUser, game: null|LGame}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    const user = LUser.fromPointer(ownProps.userID);
    const gameID = state.game.pointer; let game: null|LGame = null;
    if(gameID) game = LGame.fromPointer(gameID);
    return {user, game};
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Home = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(HomeComponent);
export default Home;
