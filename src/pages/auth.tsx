import Head from 'next/head';
import React, {useState} from "react";
import Auth from "@/components/auth";
import Loading from "@/components/common/Loading";
import {RootState} from "@/redux";
import {useSelector} from "react-redux";
import Home from "@/components/home";
import {useEffectOnce} from "usehooks-ts";
import {U} from "@/utils/functions";

export default function AuthPage() {
    const isLoading= useSelector((state: RootState) => state.utility).loading;
    const [loading, setLoading] = useState(true);
    const userID = useSelector((state: RootState) => state.user).pointer;

    useEffectOnce(() => {U.sleep(1).then(() => setLoading(false))});

    return(<>
        {
            (isLoading || loading) ? <Loading /> :
                (userID) ? <Home userID={userID} /> :
                    <Auth />
        }
    </>);

}

