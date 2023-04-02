import {initializeApp} from 'firebase/app';
import Env from "@/firebase/env";
import {getFirestore} from '@firebase/firestore';
import {getAuth} from '@firebase/auth';

const firebaseConfig = {
    apiKey: Env.apiKey,
    authDomain: Env.authDomain,
    projectId: Env.projectId,
    storageBucket: Env.storageBucket,
    messagingSenderId: Env.messagingSenderId,
    appId: Env.appId
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
