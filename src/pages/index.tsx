import styles from '@/styles/home.module.scss';
import Head from 'next/head';
import React from "react";
import {FirebaseAction} from "@/firebase/actions";

export default function Home() {
    const logout = (evt: React.MouseEvent<HTMLButtonElement>) => {
        FirebaseAction.logout();
    }

    return (<>
        <Head>
            <title>Home</title>
        </Head>
        <div className={[styles.div, styles.label].join(' ')}>Hello World</div>
        {['lobbies', 'auth'].map((label, index) => {
            return(<div key={index}>
                <a href={'/' + label}>{label}</a>
            </div>);
        })}
        <button onClick={logout}>logout</button>
    </>);
}
