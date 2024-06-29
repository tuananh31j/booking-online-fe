'use client';

import { Menu, Search, Settings, Slash, UserCircle2 } from 'lucide-react';
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
import BreadCrumbComponent from '~/components/_common/Breadcrumb';

const AdminNavbar = ({
    setIsOpenSideBar,
    isOpenSideBar,
}: {
    setIsOpenSideBar: (state: boolean) => void;
    isOpenSideBar: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = useLogout();

    return (
        <>
            <nav className='duration-250 flex-wraps relative mx-6 mt-[0.313rem] flex items-center justify-between rounded-2xl border bg-card px-0 py-2 shadow-xl  transition-all ease-in dark:bg-[#111c44] sm:flex-nowrap  md:flex-nowrap lg:justify-start'>
                <Menu
                    onClick={() => setIsOpenSideBar(true)}
                    className='ms-4 block cursor-pointer hover:opacity-45  xl:hidden'
                />
                <div className='mx-auto flex w-full flex-nowrap items-center justify-between px-4 py-1 '>
                    <nav className='hidden w-1/2 sm:block'>
                        <BreadCrumbComponent />

                        <h6 className='mb-0 font-bold capitalize'>Dashboard</h6>
                    </nav>

                    {/* css grow */}
                    <div className='mt-2 flex w-1/2 items-center justify-end sm:mr-6 sm:mt-0 md:mr-0 lg:flex lg:basis-auto'>
                        <div className='w-full items-center sm:w-[unset] md:ml-auto md:pr-4'>
                            <form>
                                <div className=' flex items-center justify-center rounded-lg bg-content px-2'>
                                    <Search size={16} strokeWidth={1.75} className='text-default' />

                                    <Input
                                        type='text'
                                        className='w-11/12  border-none outline-none sm:w-[unset]'
                                        placeholder='Type Here... '
                                    />
                                </div>
                            </form>
                        </div>

                        <ul className='md-max:w-full mb-0 ml-2 flex list-none flex-row justify-end pl-0 md:ml-0'>
                            <li className='flex  cursor-pointer items-center p-1 sm:block'>
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
                                        <DropdownMenuSeparator />

                                        <DropdownMenuGroup></DropdownMenuGroup>

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
