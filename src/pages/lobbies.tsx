import Head from 'next/head';
import React, {useEffect, useState} from "react";
import Lobbies from "@/components/lobbies";
import {FirebaseAction} from "@/firebase/actions";
import {lobbySlice} from "@/redux/store/lobby";
import {RootState} from "@/redux";
import {useSelector} from "react-redux";
import {Dictionary} from "@/utils/type";
import {DUser, LLobby} from "@/data";
import Auth from "@/components/auth";
import {useEffectOnce} from "usehooks-ts";
import Loading from "@/components/common/Loading";

export default function LobbiesPage() {
    const [isLoading, setLoading] = useState(true);
    const authGuard = useSelector((state: RootState) => state.user).pointer !== '';


    useEffectOnce(() => {
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => setLoading(false));
    });
    useEffect(() => { FirebaseAction.load('lobbies', LLobby.name); });

    return (<>
        <Head>
            <title>{(authGuard) ? 'Lobbies' : 'Auth'}</title>
        </Head>
        {(isLoading) ? <Loading /> : (authGuard) ? <Lobbies /> : <Auth />}
    </>);
}

