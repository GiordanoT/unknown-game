import React from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {LUser} from "@/data";
import {FirebaseAction} from "@/firebase/actions";

export function NavbarComponent(props: AllProps) {
    const user = props.user;

    const logout = () => {FirebaseAction.logout();}

    return(<div>
        {JSON.stringify(user)}
        <button onClick={logout}>logout</button>
    </div>);
}

interface OwnProps {}
interface StateProps {user: null|LUser}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    const users = state.users; let user: null|LUser = null;
    for(let pointer in users) {user = LUser.fromPointer(pointer);}
    return {user};
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Navbar = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(NavbarComponent);
export default Navbar;
