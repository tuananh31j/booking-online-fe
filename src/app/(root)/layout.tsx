import Footer from '~/components/Footer';
import Header from '~/components/Header';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className='mx-auto max-w-[1638px]'>
            <Header />
            <main className='mx-4 mt-[1.5rem] min-h-[100vh] max-w-[1638px] md:mx-6 2xl:mx-auto'>{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
