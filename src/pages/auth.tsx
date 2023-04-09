import Head from 'next/head';
import React, {useState} from "react";
import Auth from "@/components/auth";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";
import Home from "@/pages/index";
import {useEffectOnce} from "usehooks-ts";
import Loading from "@/components/common/Loading";
import {U} from "@/utils/functions";

export default function AuthPage() {
    const [isLoading, setLoading] = useState(true);
    const userID = useSelector((state: RootState) => state.user).pointer !== '';

    useEffectOnce(() => {
        U.sleep(1).then(() => setLoading(false));
    })

    return(<>
        <Head><title>{(!userID) ? 'Auth' : 'Home'}</title></Head>
        {(isLoading) ? <Loading /> : (userID)? <Loading /> : <Auth />}
    </>);

}

