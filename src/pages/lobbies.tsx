import Head from 'next/head';
import React, {useEffect} from "react";
import Lobbies from "@/components/lobbies";
import {FirebaseAction} from "@/firebase/actions";
import {lobbySlice} from "@/redux/store/lobby";

export default function LobbiesPage() {
    useEffect(() => { FirebaseAction.load('lobbies', lobbySlice).then(); });

    return (<>
        <Head>
            <title>Lobbies</title>
        </Head>
        <Lobbies />
    </>);
}

