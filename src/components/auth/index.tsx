import React, {useState} from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {FirebaseAction} from "@/firebase/actions";
import {ReduxUtilityAction} from "@/redux/actions/utility";
import {U} from "@/utils/functions";
import {useRouter} from "next/router";

function AuthComponent(props: AllProps) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const signin = async() => {
        ReduxUtilityAction.setLoading(true);
        const result = await FirebaseAction.signin(email, password);
        setError(!result);
        ReduxUtilityAction.setLoading(false);
        if(result) await U.goto(router, 'profile');
    }
    const login = async() => {
        ReduxUtilityAction.setLoading(true);
        const result = await FirebaseAction.login(email, password);
        setError(!result);
        ReduxUtilityAction.setLoading(false);
        if(result) await U.goto(router, 'profile');
    }

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
