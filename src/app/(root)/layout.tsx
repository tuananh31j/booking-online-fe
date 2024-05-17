import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Header />
            <main className='mx-4 mt-[1.5rem] min-h-[100vh] max-w-[1638px] md:mx-6 2xl:mx-auto'>{children}</main>
            <Footer />
        </>
    );
};

export default MainLayout;
