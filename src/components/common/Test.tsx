import React from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {FirebaseAction} from "@/firebase/actions";
import {DUser, LLobby, LUser} from "@/data";

export function TestComponent(props: AllProps) {
    const test = async() => {
        const x = await FirebaseAction.select<DUser>('users', ['name', 'email'], ['Test_1', 'test1@mail.it'])
        console.log(x)
    }

    return(<div>
        <button onClick={test}>click</button>
    </div>);


}

interface OwnProps {}
interface StateProps {lobby: null|LLobby}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    const pointer = state.lobbies.pointers[0]; let lobby: null|LLobby = null;
    if(pointer) lobby = LUser.fromPointer(pointer);
    return {lobby}
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Test = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(TestComponent);
export default Test;
