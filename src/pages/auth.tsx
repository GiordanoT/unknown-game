import Head from 'next/head';
import React, {useEffect, useState} from "react";
import Auth from "@/components/auth";
import {useEffectOnce} from "usehooks-ts";
import Loading from "@/components/common/Loading";
import {U} from "@/utils/functions";
import {useRouter} from "next/router";
import {RootState, store} from "@/redux";
import {useSelector} from "react-redux";

export default function AuthPage() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const userID = useSelector((state: RootState) => state.user).pointer;

    useEffectOnce(() => {
        U.sleep(1).then(() => {setLoading(false)});
    });

    useEffect(() => {
        if(userID) U.goto(router, '');
    }, [router, userID]);

    return(<>
        <Head><title>Auth</title></Head>
        {(!isLoading && !userID) ? <Auth /> : <Loading />}
    </>);

}

