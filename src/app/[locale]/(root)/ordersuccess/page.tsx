'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import MapIcon from '~/components/_common/Icons/map/Map';
import PopupLocationDetails from '~/components/elements/PopupStoreDetails';
import useBooking from '~/hooks/useBooking';
// import PopupStaffProfile from '~/components/elements/PopupStaffProfile';
import useToastDisplay from '~/hooks/useToastDisplay';

export default function OrderSuccess() {
    const t = useTranslations('OrderSuccess');
    const { booked, resetStepBooking } = useBooking();
    const router = useRouter();

    const toast = useToastDisplay();
    useEffect(() => {
        if (!booked) {
            resetStepBooking();
        } else {
            toast({
                title: 'Cảm ơn bạn đã đặt dịch vụ',
                status: 'success',
                description: `${booked.data.customer_name} đã đặt dịch vụ làm móng vào thời gian ${booked.data.date_order} ${booked.data.time_order}`,
            });
        }
    }, []);
    return (
        <>
            <div className='mb-4'>
                <h3 className='text-2xl'>Thông tin đăng ký lịch đặt:</h3>
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
                            <div className='mt-2 h-[1px] w-full bg-card' />
                        </div>
                        <div className='w-[50%]'>
                            <div className=' flex flex-col gap-2'>
                                <span className='text-[#777777]'>{t('informationService')}:</span>
                                <span className='h-[35px] text-xl'>Nail Care (Nail Care)</span>
                            </div>
                            <div className='mt-2 h-[1px] w-full bg-card' />
                            <div className='mt-4 flex flex-col gap-2'>
                                <span className='text-[#777777]'>{t('descService')}:</span>
                                <span className='h-[35px] text-base'>
                                    Do you want to have a manicure or pedicare? Please leave a note for us for better
                                    service.
                                </span>
                            </div>
                            <div className='mt-2 h-[1px] w-full bg-card' />
                            <div className='mt-4 flex flex-col gap-2'>
                                <span className='text-[#777777]'>{t('timedoneservice')}:</span>
                                <span className='h-[35px] text-xl'>1 tiếng 30 phút</span>
                            </div>
                            <div className='mt-2 h-[1px] w-full bg-card' />
                            <div className='mt-4 flex justify-between'>
                                <div className='flex flex-col gap-2'>
                                    <span className='text-[#777777]'>{t('dateBooking')}:</span>
                                    <span className='h-[35px] text-xl'>1/6/2024</span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <span className='text-[#777777]'>Thời gian:</span>
                                    <span className='h-[35px] text-xl'>13:30</span>
                                </div>
                            </div>
                            <div className='mt-2 h-[1px] w-full bg-card' />
                            <div className='mt-4 flex items-center justify-between'>
                                <div className='flex flex-col gap-2'>
                                    <span className='text-[#777777]'>{t('AssignedStaff')}:</span>
                                    <span className='h-[35px] text-xl'>Lương Chính Quốc</span>
                                </div>
                                <div>{/* <PopupStaffProfile /> */}</div>
                            </div>
                            <div className='mt-2 h-[1px] w-full bg-card' />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
