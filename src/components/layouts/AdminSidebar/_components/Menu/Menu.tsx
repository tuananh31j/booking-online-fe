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
import { useTranslations } from 'next-intl';

interface MenuItemProps {
    path: string;
    name: string;
    icon: LucideIcon;
}

const Menu: React.FC = () => {
    const [menuList, setMenuList] = useState<MenuItemProps[]>([]);
    const { isAdmin } = useAuth();
    const t = useTranslations('SideBar');

    const ADMIN_MENU: MenuItemProps[] = [
        { path: '/admin/dashboard', name: t('Admin_SideBar_Menu.dashboard'), icon: LayoutDashboard },
        { path: '/admin/store', name: t('Admin_SideBar_Menu.stores'), icon: StoreIcon },
        { path: '/admin/orders', name: t('Admin_SideBar_Menu.orders'), icon: ListOrdered },
        { path: '/admin/staff-list', name: t('Admin_SideBar_Menu.staffs'), icon: UserRound },
        { path: '/admin/category', name: t('Admin_SideBar_Menu.categories'), icon: Sofa },
        { path: '/admin/services', name: t('Admin_SideBar_Menu.services'), icon: HandPlatter },
    ];

    const STAFF_MENU: MenuItemProps[] = [
        { path: 'orders', name: t('Staff_SideBar_Menu.orders'), icon: ListOrdered },
        { path: 'schedules', name: t('Staff_SideBar_Menu.schedules'), icon: CalendarDays },
    ];

    useEffect(() => {
        const MENU_LIST = isAdmin ? ADMIN_MENU : STAFF_MENU;
        setMenuList(MENU_LIST);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
