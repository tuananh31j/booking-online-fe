'use client';

import React, { useEffect, useState } from 'react';
import {
    CalendarDays,
    HandPlatter,
    LayoutDashboard,
    ListOrdered,
    Sofa,
    StoreIcon,
    UserRound,
    LucideIcon,
} from 'lucide-react';
import MenuItem from '~/components/layouts/AdminSidebar/_components/Menu/MenuItem';
import useAuth from '~/hooks/useAuth';

interface MenuItemProps {
    path: string;
    name: string;
    icon: LucideIcon;
}

const ADMIN_MENU: MenuItemProps[] = [
    { path: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { path: 'store', name: 'Store', icon: StoreIcon },
    { path: 'orders', name: 'Orders', icon: ListOrdered },
    { path: 'staff-list', name: 'Manage staffs', icon: UserRound },
    { path: 'category', name: 'Manage category', icon: Sofa },
    { path: 'services', name: 'Services', icon: HandPlatter },
    // { path: 'opening', name: 'Manage opening', icon: Clock },
];

const STAFF_MENU: MenuItemProps[] = [
    { path: 'orders', name: 'Orders', icon: ListOrdered },
    { path: 'schedules', name: 'Manage schedules', icon: CalendarDays },
];

const Menu: React.FC = () => {
    const [menuList, setMenuList] = useState<MenuItemProps[]>([]);
    const { isAdmin } = useAuth();
    useEffect(() => {
        const MENU_LIST = isAdmin ? ADMIN_MENU : STAFF_MENU;
        setMenuList(MENU_LIST);
    }, [isAdmin]);

    return (
        <>
            <div className='fixed bottom-0 left-0 right-0 top-0 -z-10 bg-[#5e72e4] bg-card transition-colors duration-300'></div>
            <div className='block max-h-screen w-auto grow basis-full items-center overflow-auto bg-card'>
                <ul className='mb-0 flex flex-col pl-0'>
                    {menuList.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <MenuItem key={i} path={item.path} name={item.name}>
                                <Icon size={16} strokeWidth={1.75} />
                            </MenuItem>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default Menu;
