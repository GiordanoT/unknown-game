import Head from 'next/head';
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";
import {useEffectOnce} from "usehooks-ts";
import Auth from "@/components/auth";
import Home from "@/components/home";
import Loading from "@/components/common/Loading";
import {CONSTRAINT} from "@/utils/type";
import {DGame} from "@/data/Game";
import {FirebaseAction} from "@/firebase/actions";
import {Action} from "@/utils/actions";
import {U} from "@/utils/functions";

export default function HomePage() {
    const [isLoading, setLoading] = useState(true);
    const userID = useSelector((state: RootState) => state.user).pointer;

    useEffect(() => {
        U.sleep(1).then(() => setLoading(false));
        const constraints: CONSTRAINT<DGame>[] = [];
        constraints.push({field: 'playerOne', operator: '==', value: userID});
        constraints.push({field: 'playerTwo', operator: '==', value: userID});
        FirebaseAction.select('games', constraints, false).then((games) => {
            if(games.length > 0) {
                const dGame = games[0];
                Action.ADD(dGame, Action.Redux);
            }
        });
    }, [userID]);

    return (<>
        <Head><title>{(userID) ? 'Home' : 'Auth'}</title></Head>
        {(isLoading) ? <Loading /> : (userID) ? <Home userID={userID} /> : <Auth />}
    </>);
}
