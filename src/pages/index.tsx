import styles from '@/styles/home.module.scss';
import Head from 'next/head';

export default function Home() {
    return (<>
        <Head>
            <title>Home</title>
        </Head>
        <div className={[styles.div, styles.label].join(' ')}>Hello World</div>
    </>);
}
