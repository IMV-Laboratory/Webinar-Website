import MainLayout from '../layouts/MainLayout';
import AttendForm from '../components/AttendForm';
import { useWebinar } from '../hooks/useWebinar';
import { useState, useEffect } from 'react';

const Attendance = () => {
    const { data: webinar } = useWebinar();
    const [allowAttendance, setAllowAttendance] = useState(false);

    useEffect(() => {
        const now = Date.now();
        const open = new Date('2022-01-29 10:30:00 GMT+7');
        const close = new Date('2022-01-29 13:15:00 GMT+7');
        if (now < close && now > open) {
            setAllowAttendance(true);
        }
    }, []);

    return (
        <MainLayout>
            <h1 className='text-[#85EFFF] max-w-lg text-center font-nulshock'>
                {webinar?.title}
            </h1>
            {allowAttendance ? (
                <AttendForm webinarId={webinar?.id} />
            ) : (
                <div className='mt-8 text-center'>
                    <h2>Formulir Kehadiran dapat diisi pada:</h2>
                    <h1>Sabtu, 29 Januari 2022 pukul 10.30 - 13.15 WIB</h1>
                </div>
            )}
        </MainLayout>
    );
};

export default Attendance;
