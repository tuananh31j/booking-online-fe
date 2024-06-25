'use client';

import { Briefcase, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import FormProfile from '~/components/_common/Profile/FormProfile';
import FormStaff from '~/components/_common/TableDisplay/Rows/Staff/FormStaff';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'; // Thêm Avatar
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { useGetDetailUserQuery } from '~/store/services/user.service';

export default function ProfileCard() {
    const { data, refetch } = useGetDetailUserQuery();
    const userData = data?.data;

    const defaultAvatar = 'https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg';
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
                            <AvatarImage src={`${userData?.image || defaultAvatar}`} />
                        </Avatar>
                    </div>
                </div>
            </div>

            <div className='border-black/12.5 rounded-t-2xl p-6 pb-6 pt-0 text-center lg:pb-4 lg:pt-2'>
                <div className='flex justify-between gap-4'>
                    {userData && (
                        <Button variant='default' className='h-fit p-0 lg:block'>
                            <PopupModal
                                Form={(e) => (
                                    <FormProfile refetch={refetch} onCloseModal={e.onCloseModal} userData={userData} />
                                )}
                                className='px-3 py-2'
                                btnName='Edit profile'
                                title='Chỉnh sửa thông tin cá nhân'
                            />
                        </Button>
                    )}

                    <Button variant='ghost' className='lg:hidden'>
                        <i className='ni ni-collection text-2.8'></i>
                    </Button>
                    <Button variant='default' className=' lg:block'>
                        Message
                    </Button>
                    <Button variant='ghost' className='lg:hidden'>
                        <i className='ni ni-email-83 text-2.8'></i>
                    </Button>
                </div>
            </div>
            <CardContent className='pb-6 pt-0 text-center lg:pb-4 lg:pt-2'>
                <div className='flex flex-wrap justify-center gap-4'></div>
                <div className='mt-6 text-center'>
                    <Avatar className='mx-auto mb-2 h-20 w-20'>
                        <AvatarImage src={userData?.image || defaultAvatar} className='object-cover' />
                    </Avatar>
                    <h5 className='text-xl font-bold dark:text-white'>
                        {userData?.name} <span className='text-base font-light'></span>
                    </h5>
                    <div className='mt-4 flex flex-col space-y-1'>
                        <div className='flex items-center justify-center text-base font-semibold text-slate-700 dark:text-white/80'>
                            <MapPin className='mr-2 dark:text-white' size={16} />
                            <span>{userData?.address}</span>
                        </div>
                        <div className='flex items-center justify-center text-base font-semibold text-slate-700 dark:text-white/80'>
                            <Phone className='mr-2 dark:text-white' size={16} />
                            <span>{userData?.phone}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
