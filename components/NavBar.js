import Image from 'next/image';

const NavBar = () => {
    return (
        <div className='pt-8 px-8 w-full'>
            <div className='flex gap-4 justify-center md:justify-start'>
                <Image
                    src='/Logo T_White Horizontal 1.png'
                    width={160}
                    height={72}
                    objectFit='contain'
                    alt='IMV Logo'
                />
            </div>
        </div>
    );
};

export default NavBar;
