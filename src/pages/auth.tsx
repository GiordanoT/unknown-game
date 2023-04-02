import Head from 'next/head';
import React from "react";
import Auth from "@/components/auth";

export default function AuthPage() {

    return (<>
        <Head>
            <title>Auth</title>
        </Head>
        <Auth />
    </>);
}

