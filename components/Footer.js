import Image from 'next/image';

const Footer = () => {
    return (
        <div className='flex flex-row items-center justify-evenly  font-montserrat py-8'>
            <div className='flex flex-col items-center'>
                <a
                    href='https://line.me/R/ti/p/@uyy9001n'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <Image
                        src='/line.png'
                        width={32}
                        height={32}
                        layout='fixed'
                        objectFit='contain'
                        alt='line'
                    />
                </a>
                <p className='hidden md:block'>@uyy9001n</p>
            </div>

            <div className='flex flex-col items-center'>
                <a
                    href='https://imvlaboratory.com'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <Image
                        src='/web.png'
                        width={32}
                        height={32}
                        layout='fixed'
                        objectFit='contain'
                        alt='web'
                    />
                </a>
                <p className='hidden md:block'>www.imvlaboratory.com</p>
            </div>
            <div className='flex flex-col items-center'>
                <a
                    href='https://www.instagram.com/imv.laboratory/'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <Image
                        src='/ig.png'
                        width={32}
                        height={32}
                        layout='fixed'
                        objectFit='contain'
                        alt='ig'
                    />
                </a>
                <p className='hidden md:block'>@imv.laboratory</p>
            </div>

            {/* <p>©2022 IMV Laboratory | Made with ❤️</p>
            <p>
                <a
                    href='https://imvlaboratory.com'
                    className='text-blue-500 hover:underline'>
                    Visit Our Official Website
                </a>
            </p> */}
        </div>
    );
};

export default Footer;
