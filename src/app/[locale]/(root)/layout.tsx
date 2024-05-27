import Footer from '~/components/Layouts/Footer';
import Header from '~/components/Layouts/Header';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default async function MainLayout({ children }: Readonly<MainLayoutProps>) {
    return (
        <>
            <div className='flex max-h-[100vh] min-h-[100vh] flex-col justify-between'>
                <Header className='' />
                <main className='z-20 mx-4 max-w-[1440px] overflow-hidden custom:mx-auto  custom:w-full'>
                    <div className='mt-4 '>{children}</div>
                </main>
                <Footer className='z-[50] w-full' />
            </div>
        </>
    );
}
