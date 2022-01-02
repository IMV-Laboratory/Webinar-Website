const Modal = ({
    title = 'Modal Title',
    message = 'Modal message goes here, modify this to tell the user what is going on',
    closeModal,
}) => {
    return (
        <div className='fixed inset-0 flex justify-center items-center px-4 bg-black bg-opacity-50'>
            <div className='flex flex-col gap-4 p-4 w-full max-w-sm rounded-xl bg-slate-800'>
                <h2>{title}</h2>
                <p>{message}</p>
                <button
                    onClick={closeModal}
                    className='p-2 bg-blue-800 hover:bg-blue-500'>
                    Ok
                </button>
            </div>
        </div>
    );
};

export default Modal;
