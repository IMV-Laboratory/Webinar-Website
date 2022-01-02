const InputField = ({ name, label, ...rest }) => {
    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={name}>{label}</label>
            <input {...rest} />
        </div>
    );
};

export default InputField;
