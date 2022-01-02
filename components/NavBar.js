import Image from 'next/image';

const NavBar = () => {
    return (
        <div className='p-4 w-full bg-slate-800'>
            <div className='flex items-center gap-4'>
                <Image
                    src='/logo.webp'
                    width={32}
                    height={32}
                    objectFit='contain'
                    alt='IMV Logo'
                />
                <div className='flex flex-col'>
                    <h2>IMV Webinar</h2>
                    <p className='text-xs text-slate-500 -mt-1'>
                        Managed by IMV Laboratory
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
