import React from 'react';
import {RootState, store} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {FirebaseAction} from "@/firebase/actions";
import {useRouter} from "next/router";
import {DUser, LUser, PUser} from "@/data/User";
import {Pointer} from "@/utils/type";
import {U} from "@/utils/functions";
import {ReduxAction} from "@/redux/actions";
import {ReduxUtilityAction} from "@/redux/actions/utility";

export function NavbarComponent(props: AllProps) {
    const user = props.user;
    const router = useRouter();

    const logout = async() => {
        ReduxUtilityAction.setLoading(true);
        FirebaseAction.logout().then(() => {
            ReduxAction.reset();
            ReduxUtilityAction.setLoading(false);
        })
    }

    const debug = () => {console.log(store.getState())}

    return(<nav className={'w-100 bg-dark p-2 d-flex'}>
        <button onClick={async() => await U.goto(router, '')} className={'btn btn-primary'}>Home</button>
        <button onClick={async() => await U.goto(router, 'profile')} className={'btn btn-primary ms-2'}>Profile</button>
        <button onClick={debug} className={'btn btn-warning ms-2'}>DEBUG</button>
        <div className={'ms-auto'}>
            <label className={'text-white my-auto me-3'}>{user.name}</label>
            <button onClick={logout} className={'btn btn-danger'}>Logout</button>
        </div>
    </nav>);


}

interface OwnProps {userID: Pointer<DUser>}
interface StateProps {user : PUser}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    const user = LUser.fromPointer(ownProps.userID);
    return {user}
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Navbar = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(NavbarComponent);
export default Navbar;
