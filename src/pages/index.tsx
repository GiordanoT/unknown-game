import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";
import {useEffectOnce} from "usehooks-ts";
import Home from "@/components/home";
import Loading from "@/components/common/Loading";
import {U} from "@/utils/functions";
import {useRouter} from "next/router";
import {DGame, LGame, PGame} from "@/data/Game";
import {CONSTRAINT} from "@/utils/type";
import {DPlayer} from "@/data/Player";
import {FirebaseAction} from "@/firebase/actions";
import Auth from "@/components/auth";
import Game from "@/components/game";
import {ReduxAction} from "@/redux/actions";
import {ReduxUtilityAction} from "@/redux/actions/utility";
import game from "@/components/game";

export default function HomePage() {
    const router = useRouter();
    const isLoading= useSelector((state: RootState) => state.utility).loading;
    const [loading, setLoading] = useState(true);
    const userID = useSelector((state: RootState) => state.user).pointer;
    const gameID = useSelector((state: RootState) => state.game).pointer;


    useEffectOnce(() => {U.sleep(2).then(() => setLoading(false))});

    useEffect(() => {
        if(userID && gameID === '') {
            const sign = U.retrieveSign(userID);
            const constraint: CONSTRAINT<DPlayer> = {field: 'sign', operator: '==', value: sign};
            FirebaseAction.select<DPlayer>('players', constraint).then((players) => {
                if(players.length > 0) {
                    const dPlayer = players[0];
                    if(dPlayer.id) {
                        const constraints: CONSTRAINT<DGame>[] = [];
                        constraints.push({field: 'playerOne', operator: '==', value: dPlayer.id});
                        constraints.push({field: 'playerTwo', operator: '==', value: dPlayer.id});
                        FirebaseAction.select('games', constraints, false).then(async(games) => {
                            if(games.length > 0) {
                                const dGame = games[0];
                                ReduxUtilityAction.setGameCode(dGame.code);
                                ReduxAction.add(dGame, true);
                            }
                        });
                    }
                }
            });
        }
    }, [router, userID, gameID]);


    return (<>
        {
            (isLoading || loading) ? <Loading /> :
                (!userID) ? <Auth /> :
                    (gameID) ? <Game userID={userID} gameID={gameID} /> :
                        <Home userID={userID} />
        }
    </>);
}
