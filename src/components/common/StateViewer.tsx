import React from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

export function StateViewerComponent(props: AllProps) {
    return(<div className={'mt-5'}>
        <hr />
        <label className={'d-block text-center'}>
            <b>utility</b>: {JSON.stringify(props.state.utility)} <br />
            <b>user</b>: {JSON.stringify(props.state.user)} <br />
            <b>players</b>: {JSON.stringify(props.state.players)} <br />
            <b>game</b>: {JSON.stringify(props.state.game)} <br />
            <b>objects</b>: {JSON.stringify(props.state.objects)} <br />
        </label>
    </div>)
}

interface OwnProps {}
interface StateProps {state : RootState}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    return {state}
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const StateViewer = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(StateViewerComponent);
export default StateViewer;
