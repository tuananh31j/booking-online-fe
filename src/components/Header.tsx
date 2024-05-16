'use client';

import Image from 'next/image';
import Dribbble from '~/components/_icons/dribbble';
import Facebook from '~/components/_icons/facebook';
import Instagram from '~/components/_icons/instagram';
import Mail from '~/components/_icons/mailicon';
import { ModeToggle } from '~/components/elements/ModeToggle';
import { useSettingQuery } from '~/hooks/useSettingQuery';

const Header = () => {
    const { data } = useSettingQuery();
    return (
        <header className='pt-[15px]'>
            <div className='mx-4 max-w-[1638px] md:mx-6 2xl:mx-auto'>
                <div className='flex items-center justify-between lg:items-start'>
                    <div className='dark:text-white'>
                        <Image src={data?.logo} alt='logoWeb' width={198} height={85} className='dark:invert' />

                        <h1 className='mt-[10px] text-xl md:text-2xl'>NAIL KITCHEN HANOI</h1>
                        <span className='text-sm '>Beauty and Wellness/Nail Salon</span>
                    </div>
                    <div className='hidden gap-5 md:flex'>
                        <div>
                            <Image
                                src='https://i.redd.it/030mmgcrecta1.png'
                                className=' rounded-lg duration-300 dark:border-2 dark:border-gray-700  lg:h-[198px] lg:w-[208px]'
                                alt='logostaff'
                                width={208}
                                height={198}
                                quality={100}
                            />
                        </div>
                        <div className=' justify-between  xl:flex xl:flex-col'>
                            <span className='flex h-[57px] items-center dark:text-white'>
                                Liên hệ hỗ trợ: 0898737406
                            </span>
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
                    <div>
                        <div className='flex flex-col-reverse items-center gap-2 md:flex-row'>
                            <ModeToggle className='w-full md:w-auto' />
                            <div className='flex items-center justify-center gap-2 rounded-md border-[1px] border-black bg-[#D5DFEB] px-2 py-[6px] dark:border-white dark:bg-black dark:bg-opacity-55 md:px-[25px] lg:justify-between lg:gap-3'>
                                <span className='text-[14px] dark:text-white md:text-base'>Tiếng Việt</span>
                                <Image
                                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg/230px-Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg.png'
                                    alt='lngLogo'
                                    width={30}
                                    height={30}
                                />
                            </div>
                        </div>
                        <span className='flex items-center text-[14px] dark:text-white md:hidden  md:text-base'>
                            Liên hệ hỗ trợ: 0898737406
                        </span>
                    </div>
                </div>
            </div>
            <div className='mt-[17px] h-[1px] w-full bg-[#7777] dark:bg-white'></div>
        </header>
    );
};

export default Header;
