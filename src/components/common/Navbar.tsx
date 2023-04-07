import React from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {FirebaseAction} from "@/firebase/actions";
import {useRouter} from "next/router";
import {LUser} from "@/data/User";

export function NavbarComponent(props: AllProps) {
    const user = props.user;
    const router = useRouter();

    const logout = () => {if(user) FirebaseAction.logout(user)}
    const goto = (link: string) => {router.push('/' + link).then()}

    return(<nav className={'w-100 bg-dark p-2 d-flex'}>
        <button onClick={() => goto('')} className={'btn btn-primary'}>Home</button>
        <button onClick={() => goto('lobbies')} className={'btn btn-primary ms-2'}>Lobbies</button>
        <button onClick={() => goto('profile')} className={'btn btn-primary ms-2'}>Profile</button>
        <div className={'ms-auto'}>
            <label className={'text-white my-auto me-3'}>{user?.name}</label>
            <button onClick={logout} className={'btn btn-danger'}>Logout</button>
        </div>
    </nav>);


}

interface OwnProps {}
interface StateProps {user : null|LUser}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    const pointer = state.user.pointer; let user: null|LUser = null;
    if(pointer) user = LUser.fromPointer(pointer);
    return {user}
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Navbar = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(NavbarComponent);
export default Navbar;
