import '@/styles/globals.scss';
import type {AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {store} from '@/redux';
import {onAuthStateChanged} from "@firebase/auth";
import {auth} from "@/firebase";
import {FirebaseAction} from "@/firebase/actions";
import {DUser} from "@/data/User";
import {CONSTRAINT} from "@/utils/type";
import StateViewer from "@/components/common/StateViewer";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import {ReduxAction} from "@/redux/actions";
import {useEffectOnce} from "usehooks-ts";

export default function App({ Component, pageProps }: AppProps) {

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  onAuthStateChanged(auth, async (user) => {
    if(user) {
      const constraint: CONSTRAINT<DUser> = {field: 'email', operator: '==', value: user.email};
      const users = await FirebaseAction.select<DUser>('users', constraint);
      if(users.length > 0) ReduxAction.add(users[0], true);
    }
  });

  useEffectOnce(() => {
    resize();
    window.addEventListener('resize', resize);
  });

  const resize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  return(<Provider store={store}>
    <Head><title>Unknown Game</title></Head>
    {
      (width >= 1200 && height >= 600) ?
        <Component {...pageProps} /> :
        <div>This resolution ({width}x{height}) is NOT supported, you should have at least 1200x600.</div>
    }
    <StateViewer />
  </Provider>);
}
