import Head from 'next/head';
import React, {useState} from "react";
import Auth from "@/components/auth";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";
import Home from "@/pages/index";
import {useEffectOnce} from "usehooks-ts";
import Loading from "@/components/common/Loading";

export default function AuthPage() {
    const [isLoading, setLoading] = useState(true);
    const authGuard = useSelector((state: RootState) => state.user).pointer !== '';

    useEffectOnce(() => {
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => setLoading(false));
    })

    return(<>
        <Head>
            <title>{(authGuard) ? 'Home' : 'Auth'}</title>
        </Head>
        {(isLoading) ? <Loading /> : (authGuard)? <Home /> : <Auth />}
    </>);

}

