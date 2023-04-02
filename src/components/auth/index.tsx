import React, {useState} from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {FirebaseAction} from "@/firebase/actions";
import Navbar from "@/components/common/Navbar";

function AuthComponent(props: AllProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const signin = (evt: React.MouseEvent<HTMLButtonElement>) => {
        FirebaseAction.signin(email, password).then((result) => {setError(!result)});
    }
    const login = (evt: React.MouseEvent<HTMLButtonElement>) => {
        FirebaseAction.login(email, password).then((result) => {setError(!result)});
    }

    return(<div>
        <Navbar />
        {(error) && <h5>error!</h5>}
        <input onChange={(evt) => {setEmail(evt.target.value)}} type={'text'} />
        <input onChange={(evt) => {setPassword(evt.target.value)}} type={'password'} />
        <button onClick={signin}>signin</button>
        <button onClick={login}>login</button>
    </div>);
}

interface OwnProps {}
interface StateProps {}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Auth = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(AuthComponent);
export default Auth;
