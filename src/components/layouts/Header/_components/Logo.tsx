'use client';

import Image from 'next/image';

export default function Logo() {
    const data = null;

    return (
        <div className='text-default'>
            {/* {data && (
                <Image
                    src={data.logo}
                    alt='logoWeb'
                    width={198}
                    height={85}
                    className='h-[85px] w-[158px] dark:invert md:h-[85px] md:w-[198px]'
                />
            )} */}

            <h1 className='text-base md:text-2xl'>NAIL KITCHEN HANOI</h1>
            <span className='text-xs md:text-sm '>Beauty and Wellness/Nail Salon</span>
        </div>
    );
}
