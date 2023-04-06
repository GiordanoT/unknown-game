import React from "react";
import {RootState} from "@/redux";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import Navbar from "@/components/common/Navbar";
import {LUser} from "@/data";

function ProfilePage(props: AllProps) {
    const user = props.user;

    const editName = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const newName = evt.target.value;
        if(newName && user) user.name = newName;
    }

    return (<div>
        <Navbar />
        <div className={'card mx-auto mt-3'}>
            <label className={'d-block'}><b>Profile</b></label>
            <hr />
            <div className={'d-flex mt-2'}>
                <label className={'my-auto'}><b>Name</b>:</label>
                <input onChange={editName} value={user?.name} className={'input ms-auto'} type={'text'} />
            </div>
            <div className={'d-flex mt-2'}>
                <label className={'my-auto'}><b>Email</b>:</label>
                <input defaultValue={user?.email} className={'input ms-auto'} type={'email'} readOnly={true} />
            </div>
        </div>
    </div>);
}
interface OwnProps {}
interface StateProps {user: null|LUser}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    const pointer = state.user.pointer; let user = null;
    if(pointer) user = LUser.fromPointer(pointer);
    return {user};
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Profile = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(ProfilePage);
export default Profile;
