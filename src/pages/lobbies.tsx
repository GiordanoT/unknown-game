import Head from 'next/head';
import React, {useEffect, useState} from "react";
import Lobbies from "@/components/lobbies";
import {FirebaseAction} from "@/firebase/actions";
import {lobbySlice} from "@/redux/store/lobby";
import {RootState} from "@/redux";
import {useSelector} from "react-redux";
import {Dictionary} from "@/utils/type";
import {DUser} from "@/data";
import Auth from "@/components/auth";
import {useEffectOnce} from "usehooks-ts";

export default function LobbiesPage() {
    const [isLoading, setLoading] = useState(true);
    const users: Dictionary<DUser> = useSelector((state: RootState) => state.users);
    const authGuard = Object.keys(users).length > 0;

    useEffectOnce(() => {
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => setLoading(false));
    });
    useEffect(() => { FirebaseAction.load('lobbies', lobbySlice); });

    return (<>
        <Head>
            <title>{(authGuard) ? 'Lobbies' : 'Auth'}</title>
        </Head>
        {(isLoading) ? <div>Loading...</div> : (authGuard) ? <Lobbies /> : <Auth />}
    </>);
}

