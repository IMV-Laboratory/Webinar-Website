import Image from 'next/image';
const Speaker = () => {
    return (
        <div className='flex flex-col items-center py-8 font-montserrat'>
            <h1>Meet Our Speaker</h1>

            <div className='flex md:flex-row flex-col justify-between py-8'>
                <div className='px-20 py-4'>
                    <Image
                        src='/Speaker kiri 1.png'
                        width={180}
                        height={180}
                        layout='fixed'
                        objectFit='contain'
                        alt='alfan'
                    />
                    <p className='text-center text-base font-bold py-2'>
                        AHMAD ALFAN
                    </p>
                    <p className='text-xs text-center'>
                        Assistant Coordinator <br /> IMV Laboratory
                    </p>
                </div>

                <div className='px-20 py-4'>
                    <Image
                        src='/Speaker Tengah1 2.png'
                        width={180}
                        height={180}
                        layout='fixed'
                        objectFit='contain'
                        alt='yoga'
                    />
                    <p className='text-center text-base font-bold py-2'>
                        YOGA YUSTIAWAN
                    </p>
                    <p className='text-xs text-center'>
                        Data Scientist <br /> Bank Rakyat Indonesia
                    </p>
                </div>
                <div className='px-20 py-4'>
                    <Image
                        src='/Speaker Kanan 1.png'
                        width={180}
                        height={180}
                        layout='fixed'
                        objectFit='contain'
                        alt='yusuf'
                    />
                    <p className='text-center text-base font-bold py-2'>
                        AKHMAD YUSUF
                    </p>
                    <p className='text-xs text-center'>
                        Data Analyst <br /> Sony Erricson
                    </p>
                </div>
            </div>
            <div className='flex flex-row py-8'>
                <div className='px-8'>
                    <Image
                        src='/zoom.png'
                        width={64}
                        height={64}
                        layout='fixed'
                        objectFit='contain'
                        alt='zoom'
                    />
                </div>
                <div>
                    <p className='font-bold text-lg text-center'>
                        29 Januari 2022
                    </p>
                    <p className='py-2 font-bold text-xs text-center tracking-tighter'>
                        10.00 - 13.00 WIB
                    </p>
                </div>
            </div>

            <p className='text-center py-4'>
                IMV Laboratory mengadakan webinar kembali dengan tema <br />
                Artificial Intelligence di industri 5.0. Webinar kali ini
                bertujuan untuk <br />
                memberi tahu prospek kerja dari alumni IMV Laboratory.
            </p>

            <div className='flex flex-col md:flex-row items-center md:justify-evenly my-8 w-full'>
                <Image
                    src='/Aya.svg'
                    width={300}
                    height={150}
                    layout='fixed'
                    objectFit='contain'
                    alt='aya'
                />
                <Image
                    src='/Dena.svg'
                    width={300}
                    height={150}
                    layout='fixed'
                    objectFit='contain'
                    alt='dena'
                />
            </div>
        </div>
    );
};

export default Speaker;
