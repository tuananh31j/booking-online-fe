'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { CircleCheckBig } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FormEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { boolean, z } from 'zod';
import FormField from '~/components/_common/FormField';
import FormItemDisplay from '~/components/_common/FormItemDisplay';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useRegisterScheduleMutation } from '~/store/services/staff.service';
import { IOpeningHoursResponse, IScheduleBody, ISchedulesRequestBody } from '~/types/Staff';

function isFetchBaseQueryError(error: any): error is FetchBaseQueryError {
    return typeof error === 'object' && error !== null && 'status' in error;
}

type ScheduleTimePicker = {
    hour: number;
    minute: number;
};

const FormScheduleSchema = z.object({});

type IFormSchedule = z.infer<typeof FormScheduleSchema>;
const ScheduleTimePicker = ({
    hours,
    choosedDate,
    onCloseModal,
}: {
    hours: IOpeningHoursResponse[];
    choosedDate: string;
    onCloseModal: () => void;
}) => {
    const toast = useToastDisplay();

    const [openingTime, setOpeningTime] = useState<IOpeningHoursResponse[]>([]);
    const [createSchedule, createScheduleState] = useRegisterScheduleMutation();
    const form = useForm<IFormSchedule>({ resolver: zodResolver(FormScheduleSchema) });

    const onSubmit: SubmitHandler<IFormSchedule> = async (dataResponse) => {
        try {
            const formData = {
                schedules: openingTime.map((e) => {
                    return { ...e, start_time: e.opening_time, end_time: e.closing_time };
                }),
            };

            // console.log(formData);
            await createSchedule(formData);
            onCloseModal();
        } catch (err) {
            console.error('Error submitting schedule:', err);
            toast({ title: 'Sửa dịch vụ Thất bại!', status: 'destructive' });
        }
    };

    useEffect(() => {
        if (createScheduleState.isError) {
            // eslint-disable-next-line no-shadow
            const { error } = createScheduleState;
            let errorMessage = 'Đăng ký / cập nhật thất bại';
            if (isFetchBaseQueryError(error) && error.data && typeof error.data === 'object') {
                const errorData = error.data as { message: string[] };
                errorMessage = errorData.message.map((e) => typeof e === 'string' && e).join(' ');
            }
            toast({
                title: errorMessage,
                status: 'destructive',
            });
        }

        if (createScheduleState.isSuccess) {
            toast({
                title: 'Đăng ký / cập nhật thành công!',
                status: 'success',
            });
        }
    }, [createScheduleState]);

    const handleSelectItem = (e: IOpeningHoursResponse, status: FormEvent<HTMLInputElement>) => {
        if (status.currentTarget.checked) {
            setOpeningTime((prevOpeningTime) => [...prevOpeningTime, e]);
        } else {
            setOpeningTime((prevOpeningTime) => prevOpeningTime.filter((item) => item.opening_time !== e.opening_time));
        }
    };
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} style={{ height: '525px' }}>
            <div className='h-5/6 overflow-y-scroll hide-scrollbar'>
                {hours.map((e, i) => (
                    <div key={i} className='m-2 inline-block h-fit w-48 rounded-lg bg-slate-100 p-3 hover:bg-slate-200'>
                        <span className=' flex '>
                            <input
                                onClick={(status) => handleSelectItem(e, status)}
                                className='mr-2'
                                type='checkbox'
                                id={`id-checkbox-${i}`}
                            />{' '}
                            <label htmlFor={`id-checkbox-${i}`} className=' cursor-pointer'>
                                {e.opening_time} - {e.closing_time}
                            </label>
                        </span>
                    </div>
                ))}
            </div>

            {hours.length === 0 && (
                <p className='mt-12 w-full text-center text-red-400'>Ngày này cửa hàng chưa mở cửa!</p>
            )}
            <div style={{ clear: 'both' }}></div>
            {openingTime.length !== 0 && (
                <button
                    className='mx-auto block h-[45px] w-[128px] rounded-xl bg-default text-reverse'
                    // type='button'
                    // onClick={onSubmit}
                >
                    Đăng ký
                </button>
            )}
        </form>
    );
};

export default ScheduleTimePicker;
