import React, {useState} from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {FirebaseAction} from "@/firebase/actions";
import {LUser} from "@/data";

export function AuthComponent(props: AllProps) {
    const user = props.user;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const signin = (evt: React.MouseEvent<HTMLButtonElement>) => {
        FirebaseAction.signin(email, password).then((result) => {setError(!result)});
    }
    const login = (evt: React.MouseEvent<HTMLButtonElement>) => {
        FirebaseAction.login(email, password).then((result) => {setError(!result)});
    }
    const logout = (evt: React.MouseEvent<HTMLButtonElement>) => {
        FirebaseAction.logout();
    }

    return(<div>
        {(error) && <h5>error!</h5>}
        {JSON.stringify(user)}
        <input onChange={(evt) => {setEmail(evt.target.value)}} type={'text'} />
        <input onChange={(evt) => {setPassword(evt.target.value)}} type={'password'} />
        <button onClick={signin}>signin</button>
        <button onClick={login}>login</button>
        <button onClick={logout}>logout</button>
    </div>);
}

interface OwnProps {}
interface StateProps {user: null|LUser}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    const users = state.users; let user = null;
    for(let pointer in users) {user = LUser.fromPointer(pointer);}
    return {user};
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Auth = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(AuthComponent);
export default Auth;
