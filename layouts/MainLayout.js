import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const MainLayout = ({ children }) => {
    return (
        <div>
            <NavBar />
            <div className='flex flex-col md:flex-row justify-center items-center gap-8 my-8'>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
