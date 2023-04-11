import Head from 'next/head';
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";
import {useEffectOnce} from "usehooks-ts";
import Loading from "@/components/common/Loading";
import {U} from "@/utils/functions";
import Game from "@/components/game";
import {useRouter} from "next/router";

export default function HomePage() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const userID = useSelector((state: RootState) => state.user).pointer;
    const gameID = useSelector((state: RootState) => state.game).pointer;

    useEffectOnce(() => {
        U.sleep(1).then(() => {setLoading(false)});
    });

    useEffect(() => {
        if(!userID) U.goto(router, 'auth');
        if(!gameID) U.goto(router, '');
    }, [router, userID, gameID]);


    return (<>
        <Head><title>Game</title></Head>
        {(!isLoading && userID) ? <Game userID={userID} gameID={gameID} /> : <Loading />}
    </>);
}
