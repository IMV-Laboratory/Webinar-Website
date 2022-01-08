import Image from 'next/image';
const Speaker = () => {
    return ( 
        <div className='flex flex-col items-center py-8'>
            <h1>
                Meet Our Speaker
            </h1>

            <div className='flex flex-row justify-between py-8'>
                <div className='px-4'>
                    <Image
                        src='/Speaker kiri 1.png'
                        width={180}
                        height={180}
                        
                    />
                    <p className='text-center text-base font-bold py-2'>
                        AHMAD ALFAN
                    </p>
                    <p className='text-xs text-center'>
                        Research Assisstant Coordinator <br /> IMV Laboratory
                    </p>
                </div>

                <div className='px-4'>
                    <Image
                            src='/Speaker Kanan 1.png'
                            width={180}
                            height={180}
                        />
                        <p className='text-center text-base font-bold py-2'>
                            BANG UCUP
                        </p>
                        <p className='text-xs text-center'>
                        Data Analyst Sony Erricson
                        </p>
                </div>
                <div className='px-4'>
                    <Image
                        src='/Speaker Kanan 2.png'
                        width={180}
                        height={180}
                    />
                    <p className='text-center text-base font-bold py-2'>
                        AHMAD ALFAN
                    </p>
                    <p className='text-xs text-center'>
                        Research Assisstant Coordinator <br /> IMV Laboratory
                    </p>
                </div>
            </div>
            <div className='flex flex-row py-8'>
                <div className='px-8'>
                    <Image
                            src='/zoom.png'
                            width={64}
                            height={50}
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
                Artificial Intelligence di industri 5.0. Webinar kali ini bertujuan untuk <br /> 
                memberi tahu prospek kerja dari alumni IMV Laboratory. 
            </p>

        </div>
     );
}
 
export default Speaker;
