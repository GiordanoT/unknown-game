import Head from 'next/head';
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";
import {useEffectOnce} from "usehooks-ts";
import Auth from "@/components/auth";
import Profile from "@/components/profile";
import Loading from "@/components/common/Loading";

export default function HomePage() {
    const [isLoading, setLoading] = useState(true);
    const authGuard = useSelector((state: RootState) => state.user).pointer !== '';


    useEffectOnce(() => {
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => setLoading(false));
    });

    return (<>
        <Head><title>{(authGuard) ? 'Profile' : 'Auth'}</title></Head>
        {(isLoading) ? <Loading /> : (authGuard) ? <Profile /> : <Auth />}
    </>);
}
