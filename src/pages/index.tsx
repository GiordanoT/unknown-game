import Head from 'next/head';
import React, {useState} from "react";
import {Dictionary} from "@/utils/type";
import {DUser} from "@/data";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";
import {useEffectOnce} from "usehooks-ts";
import Auth from "@/components/auth";
import Home from "@/components/home";

export default function HomePage() {
    const [isLoading, setLoading] = useState(true);
    const authGuard = useSelector((state: RootState) => state.user).pointer !== '';

    useEffectOnce(() => {
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => setLoading(false));
    });

    return (<>
        <Head>
            <title>Home</title>
        </Head>
        {(isLoading) ? <div>Loading...</div> : (authGuard) ? <Home /> : <Auth />}
    </>);
}
