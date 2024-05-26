import { HandPlatter, LayoutDashboard, ListOrdered, UserRound } from 'lucide-react';
import React from 'react';
import MenuItem from '~/components/Layouts/AdminSidebar/_components/Menu/MenuItem';

const MENU_LIST = [
    { path: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard size={16} strokeWidth={1.75} /> },
    { path: 'orders', name: 'Orders', icon: <ListOrdered size={16} strokeWidth={1.75} /> },
    { path: 'staff-list', name: 'Manage staffs', icon: <UserRound size={16} strokeWidth={1.75} /> },
    { path: 'services', name: 'Services', icon: <HandPlatter size={16} strokeWidth={1.75} /> },
];

const Menu = () => {
    return (
        <div className='block h-[300px] max-h-screen w-auto grow basis-full items-center overflow-auto pb-[200px]'>
            <ul className='mb-0 flex flex-col pl-0'>
                {MENU_LIST.map((item, i) => (
                    <MenuItem key={i} path={item.path} name={item.name}>
                        {item.icon}
                    </MenuItem>
                ))}

                {/* <li className='mb-2 mt-4 w-full'>
                    <h6 className='ml-2 pl-6 text-xs font-bold uppercase leading-tight opacity-60 dark:text-white'>
                        Account pages
                    </h6>
                </li>
                <li className='mt-[0.125rem] w-full'>
                    <a
                        className='ease-nav-brand mx-2 my-0 flex items-center whitespace-nowrap rounded-lg px-4 py-[0.625rem] text-sm transition-colors hover:bg-[#EAEDFC]  dark:text-white dark:opacity-80 dark:hover:bg-[#192555]'
                        href='./pages/profile.html'
                    >
                        <div className='mr-1 flex items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-[0.625rem]'>
                            <UserRound size={16} strokeWidth={1.75} />
                        </div>
                        <span className='ease pointer-events-none ml-1 opacity-100 duration-300'>Profile</span>
                    </a>
                </li> */}
            </ul>
        </div>
    );
};

export default Menu;
