'use client';

import { useEffect, useState } from 'react';
import { useRegisterScheduleMutation, useSeeOpeningHoursQuery } from '~/store/services/staff.service';
import useToastDisplay from '~/hooks/useToastDisplay';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { IOpeningHoursResponse } from '~/types/Staff';
import ScheduleCalendar from '~/components/_common/TableDisplay/Rows/Schedule/ScheduleCalendar';
import { CalendarPlus, Trash } from 'lucide-react';

function isFetchBaseQueryError(error: any): error is FetchBaseQueryError {
    return typeof error === 'object' && error !== null && 'status' in error;
}
const FormSchedule = ({ onCloseModal }: { onCloseModal: () => void }) => {
    // console.log(onCloseModal);
    const toast = useToastDisplay();
    const [choosingDate, setChoosingDate] = useState(false);

    const [createSchedule, createScheduleState] = useRegisterScheduleMutation();

    const [dataWorkingTime, setDataWorkingTime] = useState<IOpeningHoursResponse[]>();

    const { data: seeOpeningHours, isError: seeOpeningHoursState, isLoading } = useSeeOpeningHoursQuery();

    const [formMessage, setFormMessage] = useState('');

    const [listChoosedDate, setListChoosedDate] = useState<IOpeningHoursResponse[]>([]);
    function handleAddDate(data?: IOpeningHoursResponse) {
        setFormMessage('');

        if (listChoosedDate.find((e) => e.day === data?.day)) {
            setFormMessage('Ngày này đã được thêm hoặc đã được đăng ký!');
            return;
        }

        if (data !== undefined) {
            setListChoosedDate([...listChoosedDate, data]);
            setChoosingDate(false);
        }
    }

    const performCreateSchedules = async () => {
        try {
            const formData = {
                schedules: listChoosedDate.map((e) => {
                    return { ...e, start_time: e.opening_time, end_time: e.closing_time };
                }),
            };
            await createSchedule(formData);
        } catch (err) {
            // console.error('Error submitting schedule:', err);
            // toast({ title: 'Sửa dịch vụ Thất bại!', status: 'destructive' });
            setFormMessage(`${err}`);
        }
    };

    useEffect(() => {
        if (!isLoading && seeOpeningHours?.data.data) {
            setDataWorkingTime(seeOpeningHours.data.data);
        }
    }, [isLoading]);

    useEffect(() => {
        if (createScheduleState.isError) {
            const { error } = createScheduleState;
            // let errorMessage = 'Đăng ký / cập nhật thất bại';
            if (isFetchBaseQueryError(error) && error.data && typeof error.data === 'object') {
                const errorData = error.data as { message: string[] };
                // errorMessage =
                setFormMessage(errorData.message.map((e) => typeof e === 'string' && e).join(' '));
            }
        }

        if (createScheduleState.isSuccess) {
            toast({
                title: 'Đăng ký / cập nhật thành công!',
                status: 'success',
            });
            onCloseModal();
        }
    }, [createScheduleState]);

    return (
        <div className='mx-auto flex  flex-col justify-center' style={{ maxHeight: '653px' }}>
            {choosingDate && (
                <ScheduleCalendar
                    handleAddDate={handleAddDate}
                    dataWorkingTime={dataWorkingTime}
                    formMessage={formMessage}
                    setChoosingDate={setChoosingDate}
                />
            )}

            {!choosingDate && (
                <button
                    className='btn flex items-center justify-center rounded-sm bg-slate-100 px-4 py-2 hover:bg-slate-200'
                    type='button'
                    onClick={() => setChoosingDate(true)}
                >
                    Thêm ngày giờ <CalendarPlus className='ms-2' />{' '}
                </button>
            )}

            {listChoosedDate.length > 0 && !choosingDate && (
                <div className='my-4 overflow-y-scroll hide-scrollbar' style={{ minHeight: '430px' }}>
                    {/* <hr className='my-2' /> */}
                    <div className='my-3'>
                        {listChoosedDate.map((e, i) => (
                            <div
                                className='btn border-1 mx-auto my-2  flex w-full justify-between rounded-sm border px-4 py-2'
                                key={i}
                            >
                                {`[${e.day}] - ${e.opening_time} - ${e.closing_time}`}{' '}
                                <Trash
                                    className='ms-2 cursor-pointer'
                                    onClick={() => {
                                        setListChoosedDate([...listChoosedDate.filter((item) => item.day !== e.day)]);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    {/* <hr className='my-2' /> */}
                </div>
            )}

            {listChoosedDate.length > 0 && !choosingDate && (
                <>
                    <p className='text-center text-sm text-red-600'>{formMessage}</p>
                    <button
                        onClick={performCreateSchedules}
                        className='btn mx-auto w-fit rounded-md bg-neutral-950 px-5 py-1 text-white'
                    >
                        Đăng ký
                    </button>
                </>
            )}
        </div>
    );
};

export default FormSchedule;
