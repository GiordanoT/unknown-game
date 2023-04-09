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
import {U} from "@/utils/functions";

export default function LobbiesPage() {
    const [isLoading, setLoading] = useState(true);
    const userID = useSelector((state: RootState) => state.user).pointer;


    useEffectOnce(() => {
        U.sleep(1).then(() => setLoading(false));
        FirebaseAction.load('lobbies', LLobby.name);
    });

    return (<>
        <Head><title>{(userID) ? 'Lobbies' : 'Auth'}</title></Head>
        {(isLoading) ? <Loading /> : (userID) ? <Lobbies userID={userID} /> : <Auth />}
    </>);
}

