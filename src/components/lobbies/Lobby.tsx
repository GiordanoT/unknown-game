import React from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {FirebaseAction} from "@/firebase/actions";
import {DLobby, LLobby} from "@/data";
import {Pointer} from "@/utils/type";


export function LobbyComponent(props: AllProps) {
    const lobby = props.lobby;

    const remove = (lobby: LLobby) => {
        FirebaseAction.remove(lobby.raw);
    }

    return(<div>
        <button onClick={async(evt) => {await remove(lobby)}}>remove</button>
        <input value={lobby.name} onChange={(evt) => {lobby.name = evt.target.value}} />
        <label>{lobby.name}</label>
    </div>);
}

interface OwnProps {lobbyID: Pointer<DLobby>}
interface StateProps {lobby: LLobby}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    const lobby = LLobby.fromPointer(ownProps.lobbyID);
    return {lobby};
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Lobby = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(LobbyComponent);
export default Lobby;
