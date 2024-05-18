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

export function LangToggle({ className }: { className?: string }) {
    const [langMode, setLanmode] = React.useState({
        name: 'Việt Nam',
        img: <FlagUS className='h-[20px] w-[30px]' />,
    });
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={className}>
                    {langMode.name}
                    {langMode.img}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className=' bg-[#D5DFEB] dark:text-black'>
                <DropdownMenuItem
                    onClick={() => setLanmode({ name: 'English', img: <FlagUS className='h-[20px] w-[30px]' /> })}
                >
                    EngLish
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setLanmode({ name: 'Tiếng Việt', img: <VietNam className='h-[20px] w-[30px]' /> })}
                >
                    Tiếng Việt
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
