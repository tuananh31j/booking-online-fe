import Footer from '~/components/Layouts/Footer';
import Header from '~/components/Layouts/Header';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default async function MainLayout({ children }: Readonly<MainLayoutProps>) {
    return (
        <div className=''>
            <Header />
            <main className='mx-4 mt-[1.5rem] min-h-[69vh] max-w-[1440px] custom:mx-auto'>{children}</main>
            <Footer />
        </div>
    );
}
