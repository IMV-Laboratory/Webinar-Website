import InputField from './InputField';
import { useState, useEffect } from 'react';
import { useRegistration } from '../hooks/useRegistration';
import Modal from './Modal';
import Image from 'next/image';

const Form = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [major, setMajor] = useState('');
    const [profile, setProfile] = useState(null);

    const registrationMutation = useRegistration(
        fullname,
        email,
        phone,
        major,
        profile
    );

    const handleRegistration = () => {
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
        setFullname('');
        setEmail('');
        setPhone('');
        setMajor('');
        setProfile(null);
        Array.from(document.querySelectorAll('input')).forEach(
            input => (input.value = '')
        );
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
                message: registrationMutation.data,
                show: true,
            });
            document.body.style.overflowY = 'hidden';
        }
    }, [
        registrationMutation.data,
        registrationMutation.error,
        registrationMutation.isSuccess,
    ]);

    return (
        <>
            <div className='flex flex-col gap-4 px-4 w-full max-w-xl'>
                <h1 className='text-center'>Ayo, daftarkan dirimu!</h1>
                <p className='-mt-2 text-blue-300 text-center'>
                    Cari tahu prospek karir dari alumni IMV Laboratory
                </p>
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
                    label='Nomor Hp / WhatsApp'
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
                    <ul className='list-disc ml-4 text-xs text-slate-500'>
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
                <button
                    onClick={handleRegistration}
                    className='mt-4 bg-blue-800 hover:bg-blue-500'>
                    Daftar
                </button>
            </div>
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

export default Form;
