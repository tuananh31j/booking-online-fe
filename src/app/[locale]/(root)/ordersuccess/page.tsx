'use client';

import React, { useEffect } from 'react';
import MapIcon from '~/components/_common/Icons/map/Map';
import PopupLocationDetails from '~/components/elements/PopupLocationDetails';
import PopupStaffProfile from '~/components/elements/PopupStaffProfile';
import useToastDisplay from '~/hooks/useToastDisplay';

export default function OrderSuccess() {
    const toast = useToastDisplay();
    useEffect(() => {
        toast({
            title: 'Cảm ơn bạn đã đặt dịch vụ',
            status: 'success',
            description: 'Tuấn Anh đã đặt dịch vụ làm móng vào thời gian 1/6/2024 13:30',
        });
    }, []);
    return (
        <>
            <div className='mb-4'>
                <h3 className='text-2xl'>Thông tin đăng ký lịch đặt:</h3>
            </div>
            <div className='no-scrollbar relative  max-h-[78vh] min-h-[78vh] overflow-y-scroll rounded-[15px] bg-content px-12 py-6 pb-[25vh]'>
                <div className='flex justify-between gap-5'>
                    <div className='w-[50%]'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-[#777777]'>Mã đặt lịch:</span>
                            <span className='h-[35px] text-xl'>1412JQKA</span>
                        </div>
                        <div className='mt-2 h-[1px] w-full bg-card' />
                        <div className='mt-4 flex flex-col gap-2'>
                            <span className='flex items-center gap-5 text-[#777777]'>
                                Địa chỉ cửa hàng đặt lịch:
                                <PopupLocationDetails>
                                    <MapIcon className='h-6 w-6 dark:invert' />
                                </PopupLocationDetails>
                            </span>
                            <span className='h-[35px] text-xl'>
                                Nailkitchen 1 - 62 Tu Hoa, Tay Ho (Westlake Area - near Sheraton Hotel)
                            </span>
                        </div>

                        <div className='mt-2 h-[1px] w-full bg-card' />
                        <div className='mt-4 flex flex-col gap-2'>
                            <span className='text-[#777777]'>Thông tin người đặt lịch:</span>
                            <span className='h-[35px] text-xl'>Nguyễn Tuấn Anh</span>
                        </div>
                        <div className='mt-2 h-[1px] w-full bg-card' />
                        <div className='mt-4 flex flex-col gap-2'>
                            <span className='text-[#777777]'>Email:</span>
                            <span className='h-[35px] text-xl'>tuananh31j@gmail.com</span>
                        </div>
                        <div className='mt-2 h-[1px] w-full bg-card' />
                        <div className='mt-4 flex flex-col gap-2'>
                            <span className='text-[#777777]'>Ngày sinh:</span>
                            <span className=' h-[35px] text-xl'>31/01/2003</span>
                        </div>
                        <div className='mt-2 h-[1px] w-full bg-card' />
                    </div>
                    <div className='w-[50%]'>
                        <div className=' flex flex-col gap-2'>
                            <span className='text-[#777777]'>Thông tin dịch vụ:</span>
                            <span className='h-[35px] text-xl'>Nail Care (Nail Care)</span>
                        </div>
                        <div className='mt-2 h-[1px] w-full bg-card' />
                        <div className='mt-4 flex flex-col gap-2'>
                            <span className='text-[#777777]'>mô tả dịch vụ:</span>
                            <span className='h-[35px] text-base'>
                                Do you want to have a manicure or pedicare? Please leave a note for us for better
                                service.
                            </span>
                        </div>
                        <div className='mt-2 h-[1px] w-full bg-card' />
                        <div className='mt-4 flex flex-col gap-2'>
                            <span className='text-[#777777]'>Thời gian dịch vụ hoàn tất (Dự kiến):</span>
                            <span className='h-[35px] text-xl'>1 tiếng 30 phút</span>
                        </div>
                        <div className='mt-2 h-[1px] w-full bg-card' />
                        <div className='mt-4 flex justify-between'>
                            <div className='flex flex-col gap-2'>
                                <span className='text-[#777777]'>Dịch vụ được đặt vào ngày:</span>
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
                                <span className='text-[#777777]'>Nhân viên phụ trách:</span>
                                <span className='h-[35px] text-xl'>Lương Chính Quốc</span>
                            </div>
                            <div>
                                <PopupStaffProfile>Xem chi tiết nhân viên</PopupStaffProfile>
                            </div>
                        </div>
                        <div className='mt-2 h-[1px] w-full bg-card' />
                    </div>
                </div>
            </div>
        </>
    );
}
