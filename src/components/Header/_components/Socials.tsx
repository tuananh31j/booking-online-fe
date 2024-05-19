import Image from 'next/image';
import React from 'react';
import Dribbble from '~/components/_icons/dribbble';
import Facebook from '~/components/_icons/facebook';
import Instagram from '~/components/_icons/instagram';
import Mail from '~/components/_icons/mailicon/Mail';

export default function Socials() {
    return (
        <>
            <div className='hidden gap-5 md:flex'>
                <div>
                    <Image
                        priority
                        src='https://i.redd.it/030mmgcrecta1.png'
                        className=' rounded-lg duration-300 dark:border-2   lg:h-[198px] lg:w-[208px]'
                        alt='logostaff'
                        width={208}
                        height={198}
                        quality={100}
                    />
                </div>
                <div className='grid content-between'>
                    <span className='flex h-[57px] items-center text-default'>Liên hệ hỗ trợ: 0898737406</span>
                    <div className='flex items-center gap-2'>
                        <a href='/'>
                            <Facebook className='h-[40px] w-[40px] xl:h-[60px] xl:w-[60px]' />
                        </a>
                        <a href='/'>
                            <Instagram className='h-[40px] w-[40px] xl:h-[60px] xl:w-[60px]' />
                        </a>
                        <a href='/'>
                            <Dribbble className='h-[40px] w-[40px]  xl:h-[60px] xl:w-[60px]' />
                        </a>
                        <a href='/'>
                            <Mail className='h-[30px] w-[30px]  fill-yellow-400 xl:h-[50px] xl:w-[50px]' />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
