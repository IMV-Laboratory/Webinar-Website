import { useState, useEffect } from 'react';
import { useWebinarDate } from '../hooks/useRegistration';

const CountDown = () => {
    const { data: webinarDate } = useWebinarDate();

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const eventDate = new Date(webinarDate);

        const counter = setInterval(() => {
            let now = new Date().getTime('GMT+0700');
            let distance = eventDate - now;

            let d = Math.floor(distance / (1000 * 60 * 60 * 24));
            let h = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let s = Math.floor((distance % (1000 * 60)) / 1000);

            setDays(d);
            setHours(h);
            setMinutes(m);
            setSeconds(s);

            if (distance < 0) {
                clearInterval();
            }
        }, 1000);
        return () => clearInterval(counter);
    }, [webinarDate]);

    return (
        <div className='px-4'>
            {days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0 ? (
                <div className='p-8 rounded-lg text-red-50 bg-red-500 bg-opacity-25'>
                    <h2 className='text-center'>
                        Masa pendaftaran berakhir 😓
                    </h2>
                </div>
            ) : (
                <div className='flex flex-row gap-4 justify-center items-center'>
                    <div className='flex flex-col gap-2 justify-center items-center rounded-lg'>
                        <h2 className='flex justify-center items-center py-3 w-12 rounded-lg text-red-50 bg-red-500 bg-opacity-25'>
                            {days}
                        </h2>
                        <p>Hari</p>
                    </div>
                    <h1 className='-mt-8'>:</h1>
                    <div className='flex flex-col gap-2 justify-center items-center rounded-lg'>
                        <h2 className='flex justify-center items-center py-3 w-12 rounded-lg text-red-50 bg-red-500 bg-opacity-25'>
                            {hours}
                        </h2>
                        <p>Jam</p>
                    </div>
                    <h1 className='-mt-8'>:</h1>
                    <div className='flex flex-col gap-2 justify-center items-center rounded-lg'>
                        <h2 className='flex justify-center items-center py-3 w-12 rounded-lg text-red-50 bg-red-500 bg-opacity-25'>
                            {minutes}
                        </h2>
                        <p>Menit</p>
                    </div>
                    <h1 className='-mt-8'>:</h1>
                    <div className='flex flex-col gap-2 justify-center items-center rounded-lg'>
                        <h2 className='flex justify-center items-center py-3 w-12 rounded-lg text-red-50 bg-red-500 bg-opacity-25'>
                            {seconds}
                        </h2>
                        <p>Detik</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CountDown;
