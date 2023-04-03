import React from "react";
import {FirebaseAction} from "@/firebase/actions";
import {RootState} from "@/redux";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {LLobby} from "@/data";
import Navbar from "@/components/common/Navbar";
import Lobby from "@/components/lobbies/Lobby";

function LobbiesPage(props: AllProps) {
    const lobbies = props.lobbies;

    const add = async(evt: React.MouseEvent<HTMLButtonElement>) => {
        FirebaseAction.add(new LLobby('Lobby').raw());
    }

    return (<div>
        <Navbar />
        <h3>Lobbies ({lobbies.length})</h3>
        <button onClick={add}>add</button>
        {lobbies.map((lobby, index) => {
            return(<Lobby key={index} lobbyID={lobby.id} />);
        })}
    </div>);
}
interface OwnProps {}
interface StateProps {lobbies: LLobby[]}
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


const Lobbies = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(LobbiesPage);
export default Lobbies;
