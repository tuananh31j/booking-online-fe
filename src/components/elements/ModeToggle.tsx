'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '~/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import useAuth from '~/hooks/useAuth';

export function ModeToggle({ className }: { className?: string }) {
    const { isAuth, isAdmin } = useAuth();
    const { setTheme } = useTheme();
    const t = useTranslations('Setting');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className={className}>
                    <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />

                    <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setTheme('light')}>{t('ThemeMode.light')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>{t('ThemeMode.dark')}</DropdownMenuItem>

                {isAdmin && (
                    <DropdownMenuItem>
                        <Link href={'/admin'}>{t('ThemeMode.system')}</Link>
                    </DropdownMenuItem>
                )}

                {isAuth && !isAdmin && (
                    <DropdownMenuItem>
                        <Link href={'/staff/schedules'}>{t('ThemeMode.system')}</Link>
                    </DropdownMenuItem>
                )}

                {/* {!isAuth && (
                    <DropdownMenuItem>
                        <Link href={'/login'}>{t('ThemeMode.login')}</Link>
                    </DropdownMenuItem>
                )} */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
