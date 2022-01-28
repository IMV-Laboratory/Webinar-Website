import Image from 'next/image';
import { useRouter } from 'next/router';

const toggleMenu = {
    '/': {
        title: 'Form Kehadiran',
        path: '/attendance',
    },
    '/attendance': {
        title: 'Form Pendaftaran',
        path: '/',
    },
};

const NavBar = () => {
    const router = useRouter();

    return (
        <div className='flex justify-between items-center p-4 md:pt-8 md:px-8 w-full'>
            <div className='flex gap-4 justify-center md:justify-start'>
                <Image
                    src='/Logo T_White Horizontal 1.png'
                    width={160}
                    height={72}
                    objectFit='contain'
                    alt='IMV Logo'
                />
            </div>
            <button
                onClick={() => router.push(toggleMenu[router.pathname].path)}
                className='bg-white bg-opacity-25 hover:bg-opacity-10 px-4 py-3'>
                {toggleMenu[router.pathname].title}
            </button>
        </div>
    );
};

export default NavBar;
