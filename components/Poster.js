import Image from 'next/image';

const Poster = ({ imagePath }) => {
    return (
        <div className='px-4'>
            <Image
                src={imagePath}
                width={480}
                height={640}
                objectFit='contain'
                alt='Poster Webinar'
            />
        </div>
    );
};

export default Poster;
