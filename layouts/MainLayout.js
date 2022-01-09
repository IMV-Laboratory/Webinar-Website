import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const MainLayout = ({ children }) => {
    return (
        <div>
            <NavBar />
            <div className='flex flex-col items-center justify-center my-8 px-4 md:px-0'>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
