'use client';

import clsx from 'clsx';
import { X } from 'lucide-react';
import ActionLink from '~/components/_common/ActionLink';
import Menu from '~/components/layouts/AdminSidebar/_components/Menu/Menu';
import './side-bar.css';

const AdminSidebar = ({
    isOpenSideBar,
    className,
    setIsOpenSideBar,
}: {
    isOpenSideBar: boolean;
    className: string;
    setIsOpenSideBar: (state: boolean) => void;
}) => {
    return (
        <aside
            className={clsx(
                `ease-nav-brand borders-0 fixed inset-y-0  z-50 my-4 block w-full max-w-64 -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border p-0 antialiased shadow-2xl transition-transform duration-200 dark:bg-[#111c44] dark:shadow-none  xl:left-0 xl:ml-6 xl:translate-x-0 ${className}`,
                {
                    'display-sidebar': isOpenSideBar === true,
                    'hidden-sidebar': isOpenSideBar === false,
                }
            )}
        >
            <div className=''>
                <div className='flex items-center justify-between '>
                    {/* <i className='fas fa-times absolute right-0 top-0 cursor-pointer p-4 text-slate-400 opacity-50 dark:text-white xl:hidden'></i> */}
                    <ActionLink
                        className='m-0 block whitespace-nowrap px-8 py-6 text-sm text-slate-700 dark:text-white'
                        to='/'
                    >
                        <h3 className='ease-nav-brand ml-1 font-semibold transition-all duration-200'>
                            Nail kitchen Dashboard
                        </h3>
                    </ActionLink>
                    <X
                        className='me-4 cursor-pointer hover:opacity-45 xl:hidden'
                        onClick={() => {
                            setIsOpenSideBar(false);
                        }}
                    />
                </div>

                <hr className='mt-0  border-t-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent' />

                <Menu />
            </div>
        </aside>
    );
};

export default AdminSidebar;
