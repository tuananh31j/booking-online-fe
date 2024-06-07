'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import ActionLink from '~/components/_common/ActionLink';
import { Button } from '~/components/ui/button';
import useToastDisplay from '~/hooks/useToastDisplay';
import Menu from '~/layouts/AdminSidebar/_components/Menu/Menu';

const cookies = new Cookies();

const AdminSidebar = () => {
    const hangleMessage = useToastDisplay();
    const router = useRouter();
    const handleLogout = () => {
        cookies.remove('user');
        cookies.remove('accessToken');
        hangleMessage({ title: 'Logged out!', status: 'default' });
        router.push('/login');
    };
    return (
        <>
            <aside className='ease-nav-brand fixed inset-y-0 z-50  my-4 block w-full max-w-64 -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-xl transition-transform duration-200 dark:bg-[#111c44] dark:shadow-none xl:left-0 xl:ml-6 xl:translate-x-0'>
                <div className=''>
                    <div>
                        <i className='fas fa-times absolute right-0 top-0 cursor-pointer p-4 text-slate-400 opacity-50 dark:text-white xl:hidden'></i>
                        <ActionLink
                            className='m-0 block whitespace-nowrap px-8 py-6 text-sm text-slate-700 dark:text-white'
                            to='/'
                        >
                            <h3 className='ease-nav-brand ml-1 font-semibold transition-all duration-200'>
                                Nail kitchen Dashboard
                            </h3>
                        </ActionLink>
                    </div>

                    <hr className='mt-0  border-t-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent' />

                    <Menu />
                </div>
                <Button
                    onClick={handleLogout}
                    className='bg-transparent text-foreground duration-100 ease-in-out hover:bg-card-foreground hover:text-card active:-translate-y-1'
                >
                    Logout
                </Button>
            </aside>
        </>
    );
};

export default AdminSidebar;
