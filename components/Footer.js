const Footer = () => {
    return (
        <div className='flex flex-col md:flex-row justify-center md:justify-between items-center px-4 py-4 md:py-2 bg-slate-800'>
            <p>©2022 IMV Laboratory | Made with ❤️</p>
            <p>
                <a
                    href='https://imvlaboratory.com'
                    className='text-blue-500 hover:underline'>
                    Visit Our Official Website
                </a>
            </p>
        </div>
    );
};

export default Footer;
