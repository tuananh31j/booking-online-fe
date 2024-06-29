'use client';

import { MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import FormProfile from '~/components/_common/Profile/FormProfile';
import { Avatar, AvatarImage } from '~/components/ui/avatar'; // Thêm Avatar
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import StaticImages from '~/static';
import { useGetDetailUserQuery } from '~/store/services/user.service';
import { IUserResponse } from '~/types/User';

export default function ProfileCard() {
    const { data, refetch } = useGetDetailUserQuery();
    const [userData, setUserData] = useState<IUserResponse>();

    useEffect(() => {
        setUserData(data?.data);
    }, [data]);

    return (
        <Card className='dark:bg-slate-850 dark:shadow-dark-xl relative mx-auto max-w-lg rounded-2xl bg-clip-border shadow-xl'>
            <Image
                src='https://res.cloudinary.com/df54xhhcq/image/upload/v1717154206/products/qlpl83jom1dqlfb2ppvo.jpg'
                alt='Profile cover image'
                width={400}
                height={200}
                className='w-full rounded-t-2xl'
            />
            <div className=''>
                <div className='flex-0 w-4/12 max-w-full px-3 '>
                    <div className='relative flex items-end lg:-mt-20'>
                        <Avatar className=' h-24 w-24 rounded-full border-2 border-solid border-white'>
                            <AvatarImage src={`${userData?.image || StaticImages.userImageDf}`} />
                        </Avatar>
                        <h5 className='text-xl font-bold dark:text-white'>
                            {userData?.name} <span className='text-base font-light'></span>
                        </h5>
                    </div>
                </div>
            </div>

            <div className='border-black/12.5 rounded-t-2xl p-6 pb-6 pt-0 text-center lg:pb-4 lg:pt-2'>
                <div className='mt-8 flex justify-center gap-4'></div>
            </div>
            <CardContent className='pb-6 pt-0 text-center lg:pb-4 lg:pt-2'>
                <div className='flex flex-wrap justify-center gap-4'></div>
                <div className='text-center'>
                    <div>
                        {userData && (
                            <Button variant='default' className='h-fit p-0 lg:block'>
                                <PopupModal
                                    Form={(e) => (
                                        <FormProfile
                                            refetch={refetch}
                                            onCloseModal={e.onCloseModal}
                                            userData={userData}
                                        />
                                    )}
                                    className='px-3 py-2'
                                    btnName='Edit profile'
                                    title='Chỉnh sửa thông tin cá nhân'
                                />
                            </Button>
                        )}
                        <div className='mt-4 flex flex-col space-y-1'>
                            <div className='flex items-center text-base font-semibold text-slate-700 dark:text-white/80'>
                                <MapPin className='mr-2 dark:text-white' size={16} />
                                <span>{userData?.address}</span>
                            </div>
                            <div className='flex items-center text-base font-semibold text-slate-700 dark:text-white/80'>
                                <Phone className='mr-2 dark:text-white' size={16} />
                                <span>{userData?.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
