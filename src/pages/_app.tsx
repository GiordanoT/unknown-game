import '@/styles/globals.scss';
import type {AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {store} from '@/redux';
import {onAuthStateChanged} from "@firebase/auth";
import {auth} from "@/firebase";
import {FirebaseAction} from "@/firebase/actions";
import {DUser} from "@/data";
import {ReduxAction} from "@/redux/actions";
import {CONSTRAINT} from "@/utils/type";

export default function App({ Component, pageProps }: AppProps) {

  onAuthStateChanged(auth, async (user) => {
    if(user) {
      const constraint: CONSTRAINT<DUser> = {field: 'email', operator: '==', value: String(user.email)};
      const users = await FirebaseAction.select<DUser>('users', constraint);
      if(users.length > 0) ReduxAction.add(users[0]);
    }
  });

  return(<Provider store={store}>
    <Component {...pageProps} />
  </Provider>);
}
