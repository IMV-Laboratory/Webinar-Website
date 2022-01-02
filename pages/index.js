import MainLayout from '../layouts/MainLayout';
import Form from '../components/Form';
import Poster from '../components/Poster';
import CountDown from '../components/CountDown';
import { useCountDown } from '../store/countDown';

export default function Home() {
    const isOutOfTime = useCountDown(state => state.isOutOfTime);

    return (
        <MainLayout>
            <Poster imagePath={'/poster.png'} />
            <div className='flex flex-col gap-8 md:gap-4 w-full max-w-xl'>
                <CountDown />
                {!isOutOfTime && <Form />}
            </div>
        </MainLayout>
    );
}
