'use client';

import { useEffect, useState } from 'react';
import AdminNavbar from '~/components/layouts/AdminNavbar';
import AdminSidebar from '~/components/layouts/AdminSidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [isOpenSideBar, setIsOpenSideBar] = useState(true);

    useEffect(() => {
        if (window) {
            window.addEventListener('resize', () => setIsOpenSideBar(window.innerWidth >= 1024));
        }
    }, []);

    return (
        <div className='relative'>
            <AdminSidebar
                className='fixed left-64 '
                isOpenSideBar={isOpenSideBar}
                setIsOpenSideBar={setIsOpenSideBar}
            />
            <main className='relative mt-4 h-full max-h-screen rounded-xl transition-all duration-200 ease-in-out xl:ml-[17rem]'>
                <AdminNavbar isOpenSideBar={isOpenSideBar} setIsOpenSideBar={setIsOpenSideBar} />
                <div className='m-6'>{children}</div>
            </main>
        </div>
    );
};

export default AdminLayout;
