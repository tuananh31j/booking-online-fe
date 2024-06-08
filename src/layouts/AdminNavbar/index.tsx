'use client';

import { Bell, Search, Settings, Slash, UserCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'universal-cookie';
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
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';
import useToastDisplay from '~/hooks/useToastDisplay';

const AdminNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const hangleMessage = useToastDisplay();
    const router = useRouter();
    const cookies = new Cookies();

    const handleLogout = () => {
        cookies.remove('user');
        cookies.remove('accessToken');
        hangleMessage({ title: 'Logged out!', status: 'default' });
        router.push('/login');
    };
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
                                <a href='./index.html' className='ease-nav-brand block p-0 text-sm transition-all'>
                                    <Bell size={16} strokeWidth={1.75} className='cursor-pointer text-default' />
                                </a>
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
                                            <DropdownMenuItem>
                                                Profile
                                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Billing
                                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Settings
                                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
                                            Log out
                                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                        </DropdownMenuItem>
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
