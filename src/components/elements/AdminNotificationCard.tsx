'use client';

import { Bell } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const AdminNotificationCard = () => {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Bell size={16} strokeWidth={1.75} className='cursor-pointer text-default' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mr-7 w-auto'>
                    <DropdownMenuLabel>Notification</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className='mx-1 flex items-center justify-between gap-3'>
                            <span>Tuan Anh đã đặt dịch vụ làm móng</span>
                            <span className='opacity-50'>30 phút trước</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='mx-1 flex items-center justify-between gap-3'>
                            <span>Ai dó đã đặt dịch vụ spa + tay vịn </span>
                            <span className='opacity-50'>30 phút trước</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default AdminNotificationCard;
