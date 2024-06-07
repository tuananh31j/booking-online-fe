'use client';

import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'; // Thêm Avatar
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';

export default function ProfileCard() {
    return (
        <Card className='dark:bg-slate-850 dark:shadow-dark-xl relative mx-auto max-w-lg rounded-2xl bg-clip-border shadow-xl'>
            <Image
                src='https://res.cloudinary.com/df54xhhcq/image/upload/v1717154206/products/qlpl83jom1dqlfb2ppvo.jpg'
                alt='Profile cover image'
                width={400}
                height={200}
                className='w-full rounded-t-2xl'
            />
            <div className='-mx-3 flex flex-wrap justify-center'>
                <div className='flex-0 w-4/12 max-w-full px-3 '>
                    <div className='relative -mt-16 mb-6 lg:-mt-20'>
                        <Avatar className='h-24 w-24 rounded-full border-2 border-solid border-white'>
                            <AvatarImage src='https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg' />
                            <AvatarFallback>HH</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>

            <div className='border-black/12.5 rounded-t-2xl p-6 pb-6 pt-0 text-center lg:pb-4 lg:pt-2'>
                <div className='flex justify-between gap-4'>
                    <Button variant='outline' className='hidden lg:block'>
                        Connect
                    </Button>
                    <Button variant='ghost' className='lg:hidden'>
                        <i className='ni ni-collection text-2.8'></i>
                    </Button>
                    <Button variant='default' className='hidden lg:block'>
                        Message
                    </Button>
                    <Button variant='ghost' className='lg:hidden'>
                        <i className='ni ni-email-83 text-2.8'></i>
                    </Button>
                </div>
            </div>

            <CardContent className='pb-6 pt-0 text-center lg:pb-4 lg:pt-2'>
                <div className='flex flex-wrap justify-center gap-4'>
                    <div className='grid w-full max-w-full flex-1 px-3 text-center'>
                        <span className='text-lg font-bold dark:text-white'>22</span>
                        <span className='text-sm leading-normal opacity-80 dark:text-white'>Friends</span>
                    </div>
                    <div className='grid w-full max-w-full flex-1 px-3 text-center'>
                        <span className='text-lg font-bold dark:text-white'>10</span>
                        <span className='text-sm leading-normal opacity-80 dark:text-white'>Photos</span>
                    </div>
                    <div className='grid w-full max-w-full flex-1 px-3 text-center'>
                        <span className='text-lg font-bold dark:text-white'>89</span>
                        <span className='text-sm leading-normal opacity-80 dark:text-white'>Comments</span>
                    </div>
                </div>
                <div className='mt-6 text-center'>
                    <Avatar className='mx-auto mb-2 h-20 w-20'>
                        <AvatarImage
                            src='https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg'
                            className='object-cover'
                        />
                        <AvatarFallback>HH</AvatarFallback>
                    </Avatar>
                    <h5 className='text-xl font-bold dark:text-white'>
                        Harmony Hieu <span className='text-base font-light'>, 21</span>
                    </h5>
                    <div className='mt-4 flex flex-col space-y-1'>
                        <div className='flex items-center justify-center text-base font-semibold text-slate-700 dark:text-white/80'>
                            <MapPin className='mr-2 dark:text-white' size={16} />
                            <span>HN, VietNam</span>
                        </div>
                        <div className='flex items-center justify-center text-base font-semibold text-slate-700 dark:text-white/80'>
                            <Briefcase className='mr-2 dark:text-white' size={16} />
                            <span>Developer web</span>
                        </div>
                        <div className='flex items-center justify-center text-base font-semibold text-slate-700 dark:text-white/80'>
                            <GraduationCap className='mr-2 dark:text-white' size={16} />
                            <span>Fpt Polytechnic</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
