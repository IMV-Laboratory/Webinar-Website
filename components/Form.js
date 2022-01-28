import InputField from './InputField';
import { useState, useEffect } from 'react';
import { useRegistration } from '../hooks/useRegistration';
import { useCheckFollower } from '../hooks/useInstagram';
import Modal from './Modal';
import Image from 'next/image';

const Form = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [igUsername, setIgUsername] = useState('');
    const [isFollower, setIsFollower] = useState(false);
    const [message, setMessage] = useState('');
    const [major, setMajor] = useState('');
    const [year, setYear] = useState('');
    const [profile, setProfile] = useState(null);

    const clearAllState = () => {
        setFullname('');
        setEmail('');
        setPhone('');
        setIgUsername('');
        setIsFollower(false);
        setMajor('');
        setYear('');
        setProfile(null);
        setMessage('');
        Array.from(document.querySelectorAll('input')).forEach(
            input => (input.value = '')
        );
    };

    const registrationMutation = useRegistration(
        fullname,
        email,
        phone,
        igUsername,
        isFollower,
        major,
        year,
        profile
    );

    const checkFollowerMutation = useCheckFollower(igUsername);

    const checkInstagram = () => {
        setIsFollower(false);
        checkFollowerMutation.mutate();
    };

    useEffect(() => {
        if (checkFollowerMutation.isSuccess) {
            setIsFollower(checkFollowerMutation.data);
            setMessage(
                <p className='text-xs'>
                    Akun Anda {igUsername}, sudah mengikuti {IMVInstagramLink}{' '}
                    di Instagram.
                </p>
            );
        }

        if (checkFollowerMutation.isError) {
            setMessage(
                <p className='text-xs'>
                    Anda belum mengikuti {IMVInstagramLink} di Instagram.
                </p>
            );
        }

        if (checkFollowerMutation.isLoading) {
            setMessage(
                <p className='text-xs'>Memeriksa akun Anda, {igUsername} ...</p>
            );
        }
    }, [
        checkFollowerMutation.data,
        checkFollowerMutation.isSuccess,
        checkFollowerMutation.isError,
        checkFollowerMutation.isLoading,
    ]);

    const handleRegistration = () => {
        event.preventDefault();
        registrationMutation.mutate();
    };

    const [modal, setModal] = useState({
        title: null,
        message: null,
        show: false,
    });

    const closeModal = () => {
        setModal({
            title: null,
            message: null,
            show: false,
        });
        document.body.style.overflowY = 'scroll';
    };

    useEffect(() => {
        if (registrationMutation.error) {
            setModal({
                title: 'Pendaftaran ditolak',
                message: registrationMutation.error.message,
                show: true,
            });
            document.body.style.overflowY = 'hidden';
        }

        if (registrationMutation.isSuccess) {
            setModal({
                title: 'Pendaftaran berhasil',
                message: (
                    <>
                        <p>{registrationMutation.data}</p>
                        <br />
                        <p>
                            Join grup telegram berikut untuk informasi
                            selanjutnya:
                        </p>
                        <a
                            className='text-blue-300 underline'
                            href='https://t.me/+kad3Yo31TxU4YjFl'
                            target='_blank'
                            rel='noopener noreferrer'>
                            Grup Telegram Webinar IMV Laboratory
                        </a>
                    </>
                ),
                show: true,
            });
            clearAllState();
            document.body.style.overflowY = 'hidden';
        }
    }, [
        registrationMutation.data,
        registrationMutation.error,
        registrationMutation.isSuccess,
    ]);

    return (
        <>
            <form
                onSubmit={handleRegistration}
                className='flex flex-col gap-4 w-full max-w-xl py-16'>
                <h1 className='text-center'>Register Below</h1>

                <InputField
                    name='fullname'
                    label='Nama Lengkap'
                    type='text'
                    placeholder='Ahmad Alfan'
                    onChange={e => setFullname(e.target.value)}
                    required
                    autoComplete='on'
                />
                <InputField
                    name='email'
                    label='Alamat Email Mahasiswa'
                    type='email'
                    placeholder='username@student.telkomuniversity.ac.id'
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete='on'
                />
                <InputField
                    name='phone'
                    label='Nomor Telegram'
                    type='tel'
                    placeholder='081234567890'
                    onChange={e => setPhone(e.target.value)}
                    required
                    autoComplete='on'
                />
                <InputField
                    name='major'
                    label='Program Studi'
                    type='text'
                    placeholder='S1 Teknik Telekomunikasi'
                    onChange={e => setMajor(e.target.value)}
                    required
                    autoComplete='on'
                />
                <InputField
                    name='year'
                    label='Angkatan'
                    type='text'
                    placeholder='2019'
                    onChange={e => setYear(e.target.value)}
                    required
                    autoComplete='on'
                />
                <InputField
                    name='profile'
                    label='Foto Wajah (Profil)'
                    type='file'
                    accept='image/*'
                    className='file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-slate-700 file:text-slate-100 hover:file:bg-slate-600'
                    onChange={e => setProfile(e.target.files[0])}
                    required
                />
                <div className='grid grid-flow-col px-4 items-center gap-4'>
                    <Image
                        src={
                            profile
                                ? URL.createObjectURL(profile)
                                : '/logo.webp'
                        }
                        onError={() => setProfile('/logo.webp')}
                        width={72}
                        height={72}
                        layout='fixed'
                        objectFit='cover'
                        className='bg-white rounded-full'
                        alt='profile'
                    />
                    <ul className='list-disc ml-4 text-xs text-slate-300'>
                        <li>
                            Foto akan ditampilkan pada website IMV Laboratory
                            pada bagian review webinar.
                        </li>
                        <li>
                            Pastikan wajah terlihat jelas dan tidak mengandung
                            unsur SARA.
                        </li>
                    </ul>
                </div>
                <div className='relative mt-2'>
                    <InputField
                        name='ig'
                        label='Instagram (Opsional)'
                        type='text'
                        placeholder='Username tanpa @'
                        onChange={e => setIgUsername(e.target.value)}
                        required
                        autoComplete='on'
                        isLoading={checkFollowerMutation.isLoading}
                        isSuccess={checkFollowerMutation.isSuccess}
                        isError={checkFollowerMutation.isError}
                        message={message}
                        state={igUsername}
                    />
                    <button
                        onClick={checkInstagram}
                        className='absolute top-8 right-2 py-2 hover:bg-slate-700'>
                        Periksa
                    </button>
                </div>
                <button
                    disabled={registrationMutation.isLoading}
                    type='submit'
                    className='mt-4 bg-violet-800 hover:bg-violet-500 disabled:bg-slate-700'>
                    {registrationMutation.isLoading ? 'Loading...' : 'Register'}
                </button>
            </form>
            {modal.show && (
                <Modal
                    title={modal?.title}
                    message={modal?.message}
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

const IMVInstagramLink = (
    <a
        className='text-blue-300 underline'
        href='https://www.instagram.com/imv.laboratory/'
        target='_blank'
        rel='noopener noreferrer'>
        @imv.laboratory
    </a>
);
export default Form;
