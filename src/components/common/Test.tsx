import React from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {DGame, LGame} from "@/data/Game";

export function TestComponent(props: AllProps) {
    const test = async() => {
        const dGame: DGame = {id: '1', owner: 'ID1', guest: null};
        const obj = LGame.new(dGame);
        console.log(obj.raw);
    }

    return(<div>
        <button onClick={test}>click</button>
    </div>);


}

interface OwnProps {}
interface StateProps {}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    return {}
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Test = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(TestComponent);
export default Test;
