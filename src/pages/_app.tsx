import '@/styles/globals.scss';
import type {AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {store} from '@/redux';
import {onAuthStateChanged} from "@firebase/auth";
import {auth} from "@/firebase";
import {FirebaseAction} from "@/firebase/actions";
import {DUser} from "@/data";
import {ReduxAction} from "@/redux/actions";

export default function App({ Component, pageProps }: AppProps) {

  onAuthStateChanged(auth, async (user) => {
    if(user) {
      const users = await FirebaseAction.select<DUser>('users', 'email', String(user.email));
      if(users.length > 0) ReduxAction.add(users[0]);
    }
  });

  return(<Provider store={store}>
    <Component {...pageProps} />
  </Provider>);
}
