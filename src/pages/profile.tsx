import Head from 'next/head';
import React, {useState} from "react";
import {Dictionary} from "@/utils/type";
import {DUser} from "@/data";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";
import {useEffectOnce} from "usehooks-ts";
import Auth from "@/components/auth";
import Profile from "@/components/profile";

export default function HomePage() {
    const [isLoading, setLoading] = useState(true);
    const users: Dictionary<DUser> = useSelector((state: RootState) => state.users);
    const authGuard = Object.keys(users).length > 0;

    useEffectOnce(() => {
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => setLoading(false));
    });

    return (<>
        <Head>
            <title>Profile</title>
        </Head>
        {(isLoading) ? <div>Loading...</div> : (authGuard) ? <Profile /> : <Auth />}
    </>);
}
