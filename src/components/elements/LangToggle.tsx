'use client';

import * as React from 'react';

import { Button } from '~/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import VietNam from '~/components/_icons/vietnam/VietNam';
import FlagUS from '~/components/_icons/flagus';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import LoadingButton from '~/components/elements/LoadingButton';

export function LangToggle({ className }: { className?: string }) {
    const [langMode, setLangMode] = React.useState<{ name: string; img: JSX.Element }>({
        name: '',
        img: <LoadingButton />,
    });

    const activeLocale = useLocale();
    React.useEffect(() => {
        if (activeLocale === 'vn') {
            setLangMode({ name: 'Tiếng Việt', img: <VietNam className='h-[20px] w-[30px]' /> });
        } else {
            setLangMode({ name: 'English', img: <FlagUS className='h-[20px] w-[30px]' /> });
        }
    }, [activeLocale]);

    const router = useRouter();
    const handleLangVN = () => {
        router.replace('/vn');
        setLangMode({ name: 'Tiếng Việt', img: <VietNam className='h-[20px] w-[30px]' /> });
    };
    const handleLangEN = () => {
        router.replace('/en');
        setLangMode({ name: 'English', img: <FlagUS className='h-[20px] w-[30px]' /> });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={className}>
                    {langMode.name}
                    {langMode.img}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end' className=' bg-[#D5DFEB] dark:text-black'>
                <DropdownMenuItem onClick={handleLangEN}>EngLish</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLangVN}>Tiếng Việt</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
