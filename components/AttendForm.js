import { useState, useEffect } from 'react';
import InputField from './InputField';
import TextArea from './TextArea';
import { useAttend, useCheckEmail } from '../hooks/useAttend';
import Modal from './Modal';

const AttendForm = ({ webinarId }) => {
    const [email, setEmail] = useState('');
    const [review, setReview] = useState('');
    const [screenshot, setScreenshot] = useState(null);
    const checkEmailMutation = useCheckEmail(email, webinarId);

    const attendMutation = useAttend(
        checkEmailMutation.data?.id,
        review,
        screenshot
    );

    const handleSubmit = event => {
        event.preventDefault();
        attendMutation.mutate();
    };

    const handleCheckEmail = () => {
        checkEmailMutation.mutate();
    };

    const clearAllState = () => {
        setEmail('');
        setReview('');
        setScreenshot(null);

        Array.from(document.querySelectorAll('input, textarea')).forEach(
            input => (input.value = '')
        );
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
        if (attendMutation.error) {
            setModal({
                title: 'Gagal!',
                message: attendMutation.error.message,
                show: true,
            });
            document.body.style.overflowY = 'hidden';
        }

        if (attendMutation.isSuccess) {
            setModal({
                title: 'Pendaftaran berhasil',
                message: attendMutation.data.message,
                show: true,
            });
            clearAllState();
            document.body.style.overflowY = 'hidden';
        }
    }, [attendMutation.data, attendMutation.error, attendMutation.isSuccess]);

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 w-full max-w-xl py-16'>
                <h1 className='text-center'>Form Kehadiran</h1>
                <InputField
                    name='registered_email'
                    label='Email Terdaftar'
                    type='email'
                    placeholder='username@student.telkomuniversity.ac.id'
                    onChange={e => setEmail(e.target.value)}
                    onBlur={handleCheckEmail}
                    isLoading={checkEmailMutation.isLoading}
                    isSuccess={checkEmailMutation.isSuccess}
                    isError={checkEmailMutation.isError}
                    message={
                        checkEmailMutation.data
                            ? checkEmailMutation.data?.message
                            : checkEmailMutation.error?.message
                    }
                    state={email}
                    required
                    autoComplete='on'
                />
                <TextArea
                    disabled={checkEmailMutation.isError || email === ''}
                    name='review'
                    label='Review'
                    type='text'
                    onChange={e => setReview(e.target.value)}
                    placeholder='Pendapat Anda mengenai webinar ini'
                    required
                    autoComplete='on'
                />
                <InputField
                    disabled={checkEmailMutation.isError || email === ''}
                    name='conference_screenshot'
                    label='Screenshot Kehadiran di Zoom'
                    type='file'
                    accept='image/*'
                    onChange={e => setScreenshot(e.target.files[0])}
                    className='file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-slate-700 file:text-slate-100 hover:file:bg-slate-600'
                    required
                    autoComplete='on'
                />
                <img
                    src={
                        screenshot
                            ? URL.createObjectURL(screenshot)
                            : '/vicon.svg'
                    }
                    onError={() => setScreenshot('/vicon.svg')}
                    className={`rounded-xl ${
                        (checkEmailMutation.isError || email === '') &&
                        'opacity-50'
                    }`}
                    alt='screenshot'
                />
                <button
                    disabled={
                        checkEmailMutation.isError ||
                        email === '' ||
                        attendMutation.isLoading
                    }
                    type='submit'
                    className='mt-4 bg-violet-800 hover:bg-violet-500 disabled:bg-slate-700'>
                    {attendMutation.isLoading ? 'Loading...' : 'Kirim'}
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

export default AttendForm;
