import React from 'react';
import {ReduxAction} from '@/redux/actions';
import {DLobby, LLobby} from '@/data/lobby';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
/* firebase */
import {doc, setDoc} from "@firebase/firestore";
import {db} from "@/firebase";


export function LobbyComponent(props: AllProps) {
    const lobbies = props.lobbies;

    const add = (evt: React.MouseEvent<HTMLButtonElement>) => {
        ReduxAction.add(new LLobby('Lobby'))
    }
    const remove = (lobby: LLobby) => {
        ReduxAction.remove(lobby);
    }

    const write = async(lobby: LLobby) => {
        const DB = doc(db, 'lobbies', lobby.id);
        await setDoc(DB, lobby.raw(),{ merge: true });
    }

    return(<div>
        <h3>Lobbies ({lobbies.length})</h3>
        <button onClick={add}>add</button>
        {lobbies.map((lobby, index) => {
            return(<div key={index}>
                <button onClick={(evt) => {remove(lobby)}}>remove</button>
                <button onClick={async() => {await write(lobby)}}>write</button>
                <input value={lobby.name} onChange={(evt) => {lobby.setName(evt.target.value)}} />
                <label>{lobby.name}</label>
            </div>);
        })}
    </div>);
}

interface OwnProps {}
interface StateProps { lobbies: LLobby[] }
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    const lobbies: LLobby[] = [];
    for(let pointer in state.lobbies) { lobbies.push(LLobby.fromPointer(pointer)); }
    return {lobbies};
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Lobby = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(LobbyComponent);
export default Lobby;
