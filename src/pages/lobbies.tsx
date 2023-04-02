import styles from '@/styles/lobbies.module.scss';
import Head from 'next/head';
import Lobby from "@/components/lobbies/lobby";
import {useEffect} from "react";
import {FirebaseAction} from "@/firebase/actions";

export default function Lobbies() {
    useEffect(() => {
        FirebaseAction.load('lobbies').then();
    });
    return (<>
        <Head>
            <title>Lobbies</title>
        </Head>
        <Lobby />
    </>);
}
