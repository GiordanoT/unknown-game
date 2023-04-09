import React from "react";
import {RootState} from "@/redux";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {LLobby, PLobby} from "@/data/Lobby";
import Navbar from "@/components/common/Navbar";
import Lobby from "@/components/lobbies/Lobby";
import {Pointer} from "@/utils/type";
import {DUser, LUser, PUser} from "@/data/User";

function LobbiesPage(props: AllProps) {
    const lobbies = props.lobbies;
    const user = props.user;

    const add = async(evt: React.MouseEvent<HTMLButtonElement>) => {
        //const dLobby: DLobby = {name: 'Lobby'};
        //const lobby = LLobby.new(dLobby);
        //MixinAction.add(lobby.raw);
    }

    return (<div>
        <Navbar userID={user.id} />
        <h3>Lobbies ({lobbies.length})</h3>
        <button onClick={add}>add</button>
        {lobbies.map((lobby, index) => {
            return(<Lobby key={index} lobbyID={lobby.id} />);
        })}
    </div>);
}
interface OwnProps {userID: Pointer<DUser>}
interface StateProps {lobbies: PLobby[], user: PUser}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    const lobbies: PLobby[] = [];
    for(let pointer of state.lobbies.pointers) { lobbies.push(LLobby.fromPointer(pointer)); }
    const user = LUser.fromPointer(ownProps.userID);
    return {lobbies, user};
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Lobbies = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(LobbiesPage);
export default Lobbies;
