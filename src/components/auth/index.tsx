import React, {useState} from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {FirebaseAction} from "@/firebase/actions";
import {useRouter} from "next/router";

function AuthComponent(props: AllProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();

    const signin = (evt: React.MouseEvent<HTMLButtonElement>) => {
        FirebaseAction.signin(email, password).then((result) => {setError(!result)});
    }
    const login = (evt: React.MouseEvent<HTMLButtonElement>) => {
        FirebaseAction.login(email, password).then((result) => {
            setError(!result);
            if(result) goto('');
        });
    }
    const goto = (link: string) => {router.push('/' + link).then()}


    return(<div className={'mx-auto card shadow mt-4'}>
        <label className={'d-block'}><b>AUTH</b></label>
        <hr />
        {(error) && <label className={'d-block text-danger mb-2'}>Invalid Data!</label>}
        <input className={'d-block input p-1 w-100'} placeholder={'email'}
               onChange={(evt) => {setEmail(evt.target.value)}} type={'text'} />
        <input className={'d-block input p-1 w-100 mt-1'} placeholder={'password'}
               onChange={(evt) => {setPassword(evt.target.value)}} type={'password'} />
        <div className={'d-flex mt-3'}>
            <button className={'d-block btn btn-primary'} onClick={login}>Login</button>
            <button className={'d-block btn btn-primary ms-auto'} onClick={signin} disabled={true}>Signin</button>
        </div>

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
