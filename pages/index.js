import MainLayout from '../layouts/MainLayout';
import Form from '../components/Form';
import Poster from '../components/Poster';
import CountDown from '../components/CountDown';
import { useCountDown } from '../store/countDown';
import Head from 'next/head';
import Hero from '../components/Hero';
import Speaker from '../components/Speaker';

export default function Home() {
    const isOutOfTime = useCountDown(state => state.isOutOfTime);

    return (
        <>
            <Head>
                <title>Webinar Artificial Intellignce IMV Laboratory</title>
                <meta
                    name='description'
                    content='Ayo daftarkan dirimu sebagai peserta webinar gratis tentang Artificial Intelligence (AI) dari IMV Laboratory. Dapatkan wawasan mengenai prospek karir sebagai alumni IMV Laboratory!'
                />
            </Head>
            <MainLayout>
                <Hero/>
                <Speaker/>
                <CountDown/>
                <Form/>
            </MainLayout>
            
        </>
    );
}
