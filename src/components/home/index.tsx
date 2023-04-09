import React, {useEffect, useState} from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import Navbar from "@/components/common/Navbar";
import {DUser, LUser, PUser} from "@/data/User";
import {CONSTRAINT, Pointer} from "@/utils/type";
import {DGame, LGame, PGame} from "@/data/Game";
import {Action} from "@/utils/actions";
import {FirebaseAction} from "@/firebase/actions";
import {U} from "@/utils/functions";
import Game from "@/components/game/Game";

function HomeComponent(props: AllProps) {
    const user = props.user;
    const game = props.game;
    const [gameCode, setGameCode] = useState('');

    useEffect(() => {
        if(game) {
            FirebaseAction.load('games', LGame.name, game.id);
            if(game.running) setGameCode('');
            else setGameCode(game.code);
        }
    }, [game])

    const create = () => {
        const dGame: DGame = {code: U.getRandomString(5), playerOne: user.id, playerTwo: null, running: false};
        const pGame = LGame.new(dGame);
        Action.ADD(pGame.raw, Action.Mixin);
        setGameCode(pGame.code);
    }
    const join = async() => {
        const constraint: CONSTRAINT<DGame> = {field: 'code', operator: '==', value: gameCode};
        const games = await FirebaseAction.select<DGame>('games', constraint);
        if(games.length > 0) {
            const dGame = games[0];
            if(!dGame.running) {
                const pGame = LGame.new(dGame);
                Action.ADD(pGame.raw, Action.Redux);
                pGame.running = true; pGame.playerTwo = user;
            } else alert('game is running');
        } else alert('invalid gameID');
    }

    if(game && game.running) {
        return(<Game game={game} />);
    } else {
        return(<div>
            <Navbar userID={user.id} />
            <div className={'card shadow mt-4 mx-auto'}>
                <label className={'d-block'}><b>GAME</b></label>
                <hr />
                <button className={'btn btn-primary mt-2'} onClick={create} disabled={game !== null}>Create</button>
                <label className={'d-block mt-2 mb-2'}>OR</label>
                <div className={'d-flex justify-content-center'}>
                    <input value={gameCode} className={'input'} onChange={(evt) => setGameCode(evt.target.value)} type={'text'} />
                    <button className={'ms-1 btn btn-primary'} onClick={join} disabled={game !== null}>Join</button>
                </div>
            </div>
        </div>);
    }

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
