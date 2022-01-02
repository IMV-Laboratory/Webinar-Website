import MainLayout from '../layouts/MainLayout';
import Form from '../components/Form';
import Poster from '../components/Poster';
import CountDown from '../components/CountDown';
import { useCountDown } from '../store/countDown';
import Head from 'next/head';

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
                <Poster imagePath={'/poster.png'} />
                <div className='flex flex-col gap-8 md:gap-4 w-full max-w-xl'>
                    <CountDown />
                    {!isOutOfTime && <Form />}
                </div>
            </MainLayout>
        </>
    );
}
