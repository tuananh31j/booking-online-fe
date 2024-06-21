'use client';

import { Search, Settings, Slash, UserCircle2 } from 'lucide-react';
import { useState } from 'react';
import ProfileCard from '~/components/elements/ProfileCard';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';
import AdminNotificationCard from '~/components/elements/AdminNotificationCard';
import useLogout from '~/hooks/useLogout';

const AdminNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = useLogout();
    return (
        <>
            <nav className='duration-250 relative mx-6 mt-[0.313rem] flex flex-wrap items-center justify-between rounded-2xl bg-card px-0 py-2 shadow-none transition-all ease-in lg:flex-nowrap lg:justify-start'>
                <div className='flex-wrap-inherit mx-auto flex w-full items-center justify-between px-4 py-1'>
                    <nav>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href='/'>Pages</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator>
                                    <Slash />
                                </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <h6 className='mb-0 font-bold capitalize'>Dashboard</h6>
                    </nav>
                    {/* css grow */}
                    <div className='mt-2 flex  items-center sm:mr-6 sm:mt-0 md:mr-0 lg:flex lg:basis-auto'>
                        <div className='flex items-center md:ml-auto md:pr-4'>
                            <form>
                                <div className=' flex items-center justify-center rounded-lg bg-content px-2'>
                                    <Search size={16} strokeWidth={1.75} className='text-default' />
                                    <Input
                                        type='text'
                                        className='w-[8rem] border-none outline-none sm:w-[unset]'
                                        placeholder='Type Here... '
                                    />
                                </div>
                            </form>
                        </div>
                        <ul className='md-max:w-full mb-0 ml-2 flex list-none flex-row justify-end pl-0 md:ml-0'>
                            <li className='flex items-center'>
                                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                    <DialogTrigger asChild>
                                        <UserCircle2 size={16} strokeWidth={1.75} />
                                    </DialogTrigger>
                                    <DialogContent className=''>
                                        <ProfileCard />
                                    </DialogContent>
                                </Dialog>
                            </li>
                            <li className='flex items-center pl-4'>
                                <span className='ease-nav-brand block p-0 text-sm transition-all'>
                                    <AdminNotificationCard />
                                </span>
                            </li>

                            <li className='relative flex items-center px-4'>
                                {/* notifications */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Settings
                                            size={16}
                                            strokeWidth={1.75}
                                            className='cursor-pointer text-default'
                                        />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='mr-5 w-56'>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>Profile</DropdownMenuItem>
                                            <DropdownMenuItem>Billing</DropdownMenuItem>
                                            <DropdownMenuItem>Settings</DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default AdminNavbar;
