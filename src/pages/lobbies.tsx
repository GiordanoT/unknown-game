import Head from 'next/head';
import React, {useEffect} from "react";
import Lobbies from "@/components/lobbies";
import {FirebaseAction} from "@/firebase/actions";
import {lobbySlice} from "@/redux/store/lobby";
import {RootState} from "@/redux";
import {useSelector} from "react-redux";
import {Dictionary} from "@/utils/type";
import {DUser} from "@/data";
import Auth from "@/components/auth";

export default function LobbiesPage() {
    useEffect(() => { FirebaseAction.load('lobbies', lobbySlice); });
    const users: Dictionary<DUser> = useSelector((state: RootState) => state.users);
    const authGuard = Object.keys(users).length > 0;

    return (<>
        <Head>
            <title>{(authGuard) ? 'Lobbies' : 'Auth'}</title>
        </Head>
        {(authGuard)? <Lobbies /> : <Auth />}
    </>);
}

