import Head from 'next/head';
import React, {useState} from "react";
import Auth from "@/components/auth";
import {Dictionary} from "@/utils/type";
import {DUser} from "@/data";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";
import Home from "@/pages/index";
import {useEffectOnce} from "usehooks-ts";

export default function AuthPage() {
    const [isLoading, setLoading] = useState(true);
    const users: Dictionary<DUser> = useSelector((state: RootState) => state.users);
    const authGuard = Object.keys(users).length > 0;

    useEffectOnce(() => {
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => setLoading(false));
    })

    return(<>
        <Head>
            <title>{(authGuard) ? 'Home' : 'Auth'}</title>
        </Head>
        {(isLoading) ? <div>Loading...</div> : (authGuard)? <Home /> : <Auth />}
    </>);

}

