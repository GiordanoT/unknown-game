import React from 'react';
import {LLobby} from '@/data/lobby';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {MixinAction} from "@/utils/actions";


export function LobbyComponent(props: AllProps) {
    const lobbies = props.lobbies;

    const add = async(evt: React.MouseEvent<HTMLButtonElement>) => {
        MixinAction.add(new LLobby('Lobby').raw());
    }
    const remove = (lobby: LLobby) => {
        MixinAction.remove(lobby.raw());
    }

    return(<div>
        <h3>Lobbies ({lobbies.length})</h3>
        <button onClick={add}>add</button>
        {lobbies.map((lobby, index) => {
            return(<div key={index}>
                <button onClick={async(evt) => {await remove(lobby)}}>remove</button>
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
