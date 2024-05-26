import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import Dribbble from '~/components/_common/Icons/dribbble';
import Facebook from '~/components/_common/Icons/facebook';
import Instagram from '~/components/_common/Icons/instagram';
import Mail from '~/components/_common/Icons/mailicon/Mail';

export default function Socials() {
    const t = useTranslations('Header');
    return (
        <>
            <div className='hidden gap-5 md:flex'>
                <div>
                    <Image
                        priority
                        src='https://i.redd.it/030mmgcrecta1.png'
                        className=' rounded-lg duration-300 dark:border-2   lg:h-[138px] lg:w-[150px]'
                        alt='logostaff'
                        width={158}
                        height={158}
                        quality={100}
                    />
                </div>
                <div className='grid content-between'>
                    <span className='flex h-[57px] items-center text-default'>{t('contact')}: 0898737406</span>
                    <div className='flex items-center gap-2'>
                        <a href='/'>
                            <Facebook className='h-[30px] w-[30px] xl:h-[50px] xl:w-[50px]' />
                        </a>
                        <a href='/'>
                            <Instagram className='h-[30px] w-[30px] xl:h-[50px] xl:w-[50px]' />
                        </a>
                        <a href='/'>
                            <Dribbble className='h-[30px] w-[30px] xl:h-[50px] xl:w-[50px]' />
                        </a>
                        <a href='/'>
                            <Mail className='h-[20px] w-[20px]  fill-yellow-400 xl:h-[40px] xl:w-[40px]' />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
