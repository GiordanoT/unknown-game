import Head from 'next/head';
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";
import {useEffectOnce} from "usehooks-ts";
import Auth from "@/components/auth";
import Profile from "@/components/profile";
import Loading from "@/components/common/Loading";
import {U} from "@/utils/functions";

export default function HomePage() {
    const [isLoading, setLoading] = useState(true);
    const userID = useSelector((state: RootState) => state.user).pointer;


    useEffectOnce(() => {
        U.sleep(1).then(() => setLoading(false));
    });

    return (<>
        <Head><title>{(userID) ? 'Profile' : 'Auth'}</title></Head>
        {(isLoading) ? <Loading /> : (userID) ? <Profile userID={userID} /> : <Auth />}
    </>);
}
