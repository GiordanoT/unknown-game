import styles from '@/styles/lobbies.module.scss';
import Head from 'next/head';
import Lobby from "@/components/lobbies/lobby";

export default function Lobbies() {
    return (<>
        <Head>
            <title>Lobbies</title>
        </Head>
        <Lobby />
    </>);
}
