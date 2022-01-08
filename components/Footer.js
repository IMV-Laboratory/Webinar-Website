import Image from 'next/image';

const Footer = () => {
    return (

        <div className='flex flex-row items-center justify-evenly py-8'>
            <div>
            <Image
                    src='/line.png'
                    width={32}
                    height={32}
                    
                />
                <p>
                    @uyy9001n
                </p>
            </div>


            <div>
                <Image
                        src='/web.png'
                        width={32}
                        height={32}
                    />
                    <p>
                    www.imvlaboratory.com
                    </p>
            </div>
            <div>
                <Image
                        src='/ig.png'
                        width={32}
                        height={32}
                    />
                    <p>
                    @imv.laboratory
                    </p>
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
