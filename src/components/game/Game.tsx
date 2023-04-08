import React from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {LGame} from "@/data/Game";
import {Action} from "@/utils/actions";

function GameComponent(props: AllProps) {
    const game = props.game;
    return(<div>
        {JSON.stringify(game)}
        <hr />
        <button className={'btn btn-danger'} onClick={() => Action.REMOVE(game.raw, Action.Mixin)}>END</button>
    </div>);
}

interface OwnProps {game: LGame}
interface StateProps {}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Game = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(GameComponent);
export default Game;
