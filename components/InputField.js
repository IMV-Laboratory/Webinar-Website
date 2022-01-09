import {
    RefreshIcon,
    CheckCircleIcon,
    XCircleIcon,
} from '@heroicons/react/outline';

const InputField = ({
    name,
    label,
    isLoading = false,
    isSuccess = false,
    isError = false,
    message,
    ...rest
}) => {
    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={name}>{label}</label>
            <input {...rest} />
            <div className='ml-1 flex gap-2'>
                {isLoading && message && (
                    <>
                        <RefreshIcon className='w-4 h-4 animate-spin text-slate-300' />
                        <p className={`text-xs text-slate-300`}>{message}</p>
                    </>
                )}
                {isSuccess && message && (
                    <>
                        <CheckCircleIcon className='w-4 h-4 text-green-300' />
                        <p className={`text-xs text-green-300`}>{message}</p>
                    </>
                )}
                {isError && message && (
                    <>
                        <XCircleIcon className='w-4 h-4 text-red-300' />
                        <div className={`text-red-300`}>{message}</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InputField;
