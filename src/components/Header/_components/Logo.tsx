'use client';

import Image from 'next/image';
import { useSettingQuery } from '~/hooks/useSettingQuery';

export default function Logo() {
    const { data } = useSettingQuery();

    return (
        <div className='dark:text-white'>
            <Image src={data?.logo} alt='logoWeb' width={198} height={85} className='dark:invert' />

            <h1 className='mt-[10px] text-xl md:text-2xl'>NAIL KITCHEN HANOI</h1>
            <span className='text-sm '>Beauty and Wellness/Nail Salon</span>
        </div>
    );
}
