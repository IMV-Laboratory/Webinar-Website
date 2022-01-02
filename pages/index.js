import MainLayout from '../layouts/MainLayout';
import Form from '../components/Form';
import Poster from '../components/Poster';
import CountDown from '../components/CountDown';
import { useState, useEffect } from 'react';
import { useWebinarDate } from '../hooks/useRegistration';

export default function Home() {
    const { data: webinarDate } = useWebinarDate();

    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        setShowForm(new Date() < new Date(webinarDate));
    }, [webinarDate]);

    return (
        <MainLayout>
            <Poster imagePath={'/poster.png'} />
            <div className='flex flex-col gap-8 md:gap-4 w-full max-w-xl'>
                <CountDown />
                {showForm && <Form />}
            </div>
        </MainLayout>
    );
}
