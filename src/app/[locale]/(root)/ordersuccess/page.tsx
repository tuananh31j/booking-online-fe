'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import MapIcon from '~/components/_common/Icons/map/Map';
import PopupLocationDetails from '~/components/elements/PopupStoreDetails';
import { Button } from '~/components/ui/button';
import useBooking from '~/hooks/useBooking';
// import PopupStaffProfile from '~/components/elements/PopupStaffProfile';
import useToastDisplay from '~/hooks/useToastDisplay';

export default function OrderSuccess() {
    const t = useTranslations('OrderSuccess');
    const { booked, resetStepBooking } = useBooking();
    const router = useRouter();

    const toast = useToastDisplay();

    const handleClick = () => {
        router.replace('/');
    };
    useEffect(() => {
        if (!booked) {
            resetStepBooking();
        } else {
            toast({
                title: t('success.title'),
                status: 'success',
                description: `${booked.data.customer_name} ${t('success.desc')} ${booked.data.date_order} ${booked.data.time_order}`,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <div className='mb-4 flex items-center gap-2'>
                <Button onClick={handleClick}>Back home</Button>
                <h3 className='text-2xl'>{t('title')}</h3>
            </div>

            {booked && (
                <div className='no-scrollbar relative  max-h-[78vh] min-h-[78vh] overflow-y-scroll rounded-[15px] bg-content px-12 py-6 pb-[25vh]'>
                    <div className='flex justify-between gap-5'>
                        <div className='w-[50%]'>
                            <div className='mt-2 h-[1px] w-full bg-card' />
                            <div className='mt-4 flex flex-col gap-2'>
                                <span className='flex items-center gap-5 text-[#777777]'>
                                    {t('locationStore')}:
                                    <PopupLocationDetails
                                        address={booked.data.customer_note}
                                        name={booked.data.customer_name}
                                        phone={booked.data.customer_phone}
                                    >
                                        <MapIcon className='h-6 w-6 dark:invert' />
                                    </PopupLocationDetails>
                                </span>
                                <span className='flex h-[35px] items-center gap-2 text-xl'>
                                    <div>{booked.data.store_name}</div>
                                    <div>{booked.data.store_address}</div>
                                </span>
                            </div>

                            <div className='mt-2 h-[1px] w-full bg-card' />
                            <div className='mt-4 flex justify-between'>
                                <div className='flex flex-col gap-2'>
                                    <span className='text-[#777777]'>{t('informationCustomer')}:</span>
                                    <span className='h-[35px] text-xl'>{booked.data.customer_name}</span>
                                </div>
                                <div className='mr-8 flex flex-col gap-2'>
                                    <span className='text-[#777777]'>{t('phonenumber')}:</span>
                                    <span className='h-[35px] text-xl'>{booked.data.customer_phone}</span>
                                </div>
                            </div>
                            <div className='mt-2 h-[1px] w-full bg-card' />
                            <div className='mt-4 flex flex-col gap-2'>
                                <span className='text-[#777777]'>{t('email')}:</span>
                                <span className='h-[35px] text-xl'>{booked.data.customer_email}</span>
                            </div>
                            <div className='mt-2 h-[1px] w-full bg-card' />
                            <div className='mt-4 flex flex-col gap-2'>
                                <span className='text-[#777777]'>{t('birthday')}:</span>
                                <span className=' h-[35px] text-xl'>{booked.data.customer_date}</span>
                            </div>
                            <h1 className='text-2xl'>{t('AssignedStaff')} </h1>
                            <div className='mt-4 flex flex-col gap-2'>
                                <span className='text-[#777777]'>{t('emailStaff')}:</span>
                                <span className=' h-[35px] text-xl'>{booked.data.staff_email}</span>
                            </div>
                            <div className='mt-4 flex flex-col gap-2'>
                                <span className='text-[#777777]'>{t('nameStaff')}:</span>
                                <span className=' h-[35px] text-xl'>{booked.data.staff_name}</span>
                            </div>
                            <div className='mt-4 flex flex-col gap-2'>
                                <span className='text-[#777777]'>{t('phonenumber')}:</span>
                                <span className=' h-[35px] text-xl'>{booked.data.staff_phone}</span>
                            </div>
                        </div>
                        <div className='h-[10vh] w-[50%]'>
                            <div className=' flex flex-col gap-2'>
                                <span className='text-[#777777]'>{t('informationService')}:</span>
                                <span className='h-[35px] text-xl'>
                                    {t('totalServiceTime')}: {booked.data.total_time}
                                </span>
                                <span className='h-[35px] text-xl'>
                                    {t('createdOn')}: {booked.data.date_order}
                                </span>
                                <span className='h-[35px] text-xl'>
                                    {t('totalPrice')}: {booked.data.total_price}
                                </span>
                            </div>
                            <div>
                                <h1 className='text-xl'>{t('serviceList')}:</h1>{' '}
                                <ul className=' ml-10 flex list-disc flex-col gap-2'>
                                    {booked.data.services.map((item) => (
                                        <li key={item.id} className='h-[35px] text-xl'>
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
