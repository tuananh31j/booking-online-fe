import Footer from '~/components/Layouts/Footer';
import Header from '~/components/Layouts/Header';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default async function MainLayout({ children }: Readonly<MainLayoutProps>) {
    return (
        <>
            <Header />
            <main className='mx-4 max-w-[1440px] md:flex md:min-h-[100vh]  md:items-center custom:mx-auto'>
                <div className='pt-4 md:w-[100%] md:pt-[55px] 2xl:pt-0'>{children}</div>
            </main>
            <Footer />
        </>
    );
}
