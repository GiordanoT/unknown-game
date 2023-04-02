import Head from 'next/head';
import React from "react";
import Auth from "@/components/auth";
import {Dictionary} from "@/utils/type";
import {DUser} from "@/data";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";
import Home from "@/pages/index";

export default function AuthPage() {
    const users: Dictionary<DUser> = useSelector((state: RootState) => state.users);
    const authGuard = Object.keys(users).length > 0;

    return (<>
        <Head>
            <title>{(authGuard) ? 'Home' : 'Auth'}</title>
        </Head>
        {(authGuard)? <Home /> : <Auth />}
    </>);
}

