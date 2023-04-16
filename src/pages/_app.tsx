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
import React from "react";
import {ReduxAction} from "@/redux/actions";

export default function App({ Component, pageProps }: AppProps) {

  onAuthStateChanged(auth, async (user) => {
    if(user) {
      const constraint: CONSTRAINT<DUser> = {field: 'email', operator: '==', value: user.email};
      const users = await FirebaseAction.select<DUser>('users', constraint);
      if(users.length > 0) ReduxAction.add(users[0], true);
    }
  });

  return(<Provider store={store}>
    <Head><title>Unknown Game</title></Head>
    <Component {...pageProps} />
    <StateViewer />
  </Provider>);
}
