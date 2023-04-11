import Head from 'next/head';
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";
import {useEffectOnce} from "usehooks-ts";
import Home from "@/components/home";
import Loading from "@/components/common/Loading";
import {U} from "@/utils/functions";
import {useRouter} from "next/router";
import {DGame} from "@/data/Game";
import {CONSTRAINT} from "@/utils/type";
import {DPlayer} from "@/data/Player";
import {FirebaseAction} from "@/firebase/actions";
import {Action} from "@/utils/actions";
import {ReduxAction} from "@/redux/actions";

export default function HomePage() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const userID = useSelector((state: RootState) => state.user).pointer;

    useEffectOnce(() => {
        U.sleep(1).then(() => {setLoading(false)});
    });

    useEffect(() => {
        if(!userID) U.goto(router, 'auth');
        else {
            const sign = U.retrieveSign(userID);
            const constraint: CONSTRAINT<DPlayer> = {field: 'sign', operator: '==', value: sign};
            FirebaseAction.select<DPlayer>('players', constraint).then((players) => {
                if(players.length > 0) {
                    const dPlayer = players[0];
                    if(dPlayer.id) {
                        const constraints: CONSTRAINT<DGame>[] = [];
                        constraints.push({field: 'playerOne', operator: '==', value: dPlayer.id});
                        constraints.push({field: 'playerTwo', operator: '==', value: dPlayer.id});
                        FirebaseAction.select('games', constraints, false).then((games) => {
                            if(games.length > 0) {
                                const dGame = games[0];
                                ReduxAction.addFIX(dGame).then((dict) => {
                                    Action.ADD(dict.obj, Action.Redux);
                                    U.goto(router, 'game');
                                });
                            }
                        });
                    }
                }
            })
        }
    }, [router, userID]);


    return (<>
        <Head><title>Home</title></Head>
        {(!isLoading && userID) ? <Home userID={userID} /> : <Loading />}
    </>);
}
