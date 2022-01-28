function TextArea({ name, label, ...rest }) {
    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={name}>{label}</label>
            <textarea {...rest} />
        </div>
    );
}

export default TextArea;
