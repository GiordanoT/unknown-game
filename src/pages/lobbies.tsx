import Head from 'next/head';
import React, {useState} from "react";
import Lobbies from "@/components/lobbies";
import {FirebaseAction} from "@/firebase/actions";
import {RootState} from "@/redux";
import {useSelector} from "react-redux";
import {LLobby} from "@/data/Lobby";
import Auth from "@/components/auth";
import {useEffectOnce} from "usehooks-ts";
import Loading from "@/components/common/Loading";

export default function LobbiesPage() {
    const [isLoading, setLoading] = useState(true);
    const authGuard = useSelector((state: RootState) => state.user).pointer !== '';


    useEffectOnce(() => {
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => setLoading(false));
        FirebaseAction.load('lobbies', LLobby.name);
    });

    return (<>
        <Head><title>{(authGuard) ? 'Lobbies' : 'Auth'}</title></Head>
        {(isLoading) ? <Loading /> : (authGuard) ? <Lobbies /> : <Auth />}
    </>);
}

