import Head from 'next/head';
import React, {useEffect, useState} from "react";
import {RootState, store} from "@/redux";
import {useEffectOnce} from "usehooks-ts";
import Profile from "@/components/profile";
import Loading from "@/components/common/Loading";
import {U} from "@/utils/functions";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

export default function HomePage() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const userID = useSelector((state: RootState) => state.user).pointer;

    useEffectOnce(() => {
        U.sleep(1).then(() => {setLoading(false)});
    });

    useEffect(() => {
        if(!userID) U.goto(router, 'auth')
    }, [router, userID]);

    return (<>
        <Head><title>Profile</title></Head>
        {(!isLoading && userID) ? <Profile userID={userID} /> : <Loading />}
    </>);
}
