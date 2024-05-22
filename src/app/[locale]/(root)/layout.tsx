import Header from '~/components/Header/Header';
import Footer from '~/components/Footer/Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default async function MainLayout({ children }: Readonly<MainLayoutProps>) {
    return (
        <div className='mx-4 min-h-[100vh] max-w-[90vw] md:mx-auto 2xl:mx-auto'>
            <Header />
            <main className='mt-[1.5rem]'>{children}</main>
            <Footer />
        </div>
    );
}
