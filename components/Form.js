import InputField from './InputField';
import { useState, useEffect } from 'react';
import { useRegistration } from '../hooks/useRegistration';
import Modal from './Modal';

const Form = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [major, setMajor] = useState('');

    const registrationMutation = useRegistration(fullname, email, phone, major);

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
                />
                <InputField
                    name='email'
                    label='Alamat Email Mahasiswa'
                    type='email'
                    placeholder='username@student.telkomuniversity.ac.id'
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <InputField
                    name='phone'
                    label='Nomor Hp / WhatsApp'
                    type='tel'
                    placeholder='081234567890'
                    onChange={e => setPhone(e.target.value)}
                    required
                />
                <InputField
                    name='major'
                    label='Program Studi'
                    type='text'
                    placeholder='S1 Teknik Telekomunikasi'
                    onChange={e => setMajor(e.target.value)}
                    required
                />
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
