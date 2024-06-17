import {
    CalendarDays,
    Clock,
    HandPlatter,
    LayoutDashboard,
    ListOrdered,
    Sofa,
    StoreIcon,
    UserRound,
} from 'lucide-react';
import React from 'react';
import MenuItem from '~/components/layouts/AdminSidebar/_components/Menu/MenuItem';

const MENU_LIST = [
    { path: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard size={16} strokeWidth={1.75} /> },
    { path: 'store', name: 'Store', icon: <StoreIcon size={16} strokeWidth={1.75} /> },
    { path: 'orders', name: 'Orders', icon: <ListOrdered size={16} strokeWidth={1.75} /> },
    { path: 'staff-list', name: 'Manage staffs', icon: <UserRound size={16} strokeWidth={1.75} /> },
    { path: 'category', name: 'Manage category', icon: <Sofa size={16} strokeWidth={1.75} /> },
    { path: 'services', name: 'Services', icon: <HandPlatter size={16} strokeWidth={1.75} /> },
    { path: 'schedules', name: 'Manage schedules', icon: <CalendarDays size={16} strokeWidth={1.75} /> },
    { path: 'opening', name: 'Manage opening', icon: <Clock size={16} strokeWidth={1.75} /> },
];

const Menu = () => {
    return (
        <>
            <div className='fixed bottom-0 left-0 right-0 top-0 -z-10 bg-[#5e72e4] bg-card transition-colors duration-300'></div>
            <div className='block max-h-screen w-auto grow basis-full items-center overflow-auto bg-card'>
                <ul className='mb-0 flex flex-col pl-0'>
                    {MENU_LIST.map((item, i) => (
                        <MenuItem key={i} path={item.path} name={item.name}>
                            {item.icon}
                        </MenuItem>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Menu;
