import Head from 'next/head';
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";
import Loading from "@/components/common/Loading";
import Game from "@/components/game";
import Auth from "@/components/auth";
import {useEffectOnce} from "usehooks-ts";
import {U} from "@/utils/functions";
import Home from "@/components/home";

export default function HomePage() {
    const isLoading= useSelector((state: RootState) => state.utility).loading;
    const [loading, setLoading] = useState(true);
    const userID = useSelector((state: RootState) => state.user).pointer;
    const gameID = useSelector((state: RootState) => state.game).pointer;

    useEffectOnce(() => {
        U.sleep(1).then(() => setLoading(false));
    });

    return (<>
        <Head><title>Unknown Game</title></Head>
        {
            (isLoading || loading) ? <Loading /> :
                (!userID) ? <Auth /> :
                    (!gameID) ? <Home userID={userID} /> :
                        <Game userID={userID} gameID={gameID} />
        }
    </>);
}
