'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import FormItemDisplay from '~/components/_common/FormItemDisplay';
import ButtonSubmit from '~/components/_common/ButtonSubmit';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { useEffect, useState } from 'react';
import { useRegisterScheduleMutation } from '~/store/services/staff.service';
import { IScheduleBody, ISchedulesRequestBody } from '~/types/Staff';
// import { toast } from '~/components/ui/use-toast';
import useToastDisplay from '~/hooks/useToastDisplay';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

function isFetchBaseQueryError(error: any): error is FetchBaseQueryError {
    return typeof error === 'object' && error !== null && 'status' in error;
}

const FormScheduleSchema = z.object({
    day: z.string({ required_error: 'Vui lòng chọn ngày!' }),
    start_time: z.string({ required_error: 'Vui lòng chọn giờ bắt đầu làm!' }),
    end_time: z.string({ required_error: 'Vui lòng chọn giờ nghỉ làm!' }),
});

type IFormSchedule = z.infer<typeof FormScheduleSchema>;

const FormSchedule = ({ onCloseModal }: { onCloseModal: () => void }) => {
    const toast = useToastDisplay();

    const [descriptionWokingTime, setDescriptionWokingTime] = useState('');

    const [createSchedule, createScheduleState] = useRegisterScheduleMutation();

    useEffect(() => {
        if (createScheduleState.isError) {
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

    const dataWorkingTime = {
        data: [
            {
                day: '2024-08-01',
                start_time: '15:50:00',
                end_time: '17:00:00',
            },
            {
                day: '2024-08-02',
                start_time: '15:50:00',
                end_time: '17:00:00',
            },
            {
                day: '2024-08-03',
                start_time: '15:50:00',
                end_time: '17:00:00',
            },
            {
                day: '2024-08-04',
                start_time: '15:50:00',
                end_time: '17:00:00',
            },
            {
                day: '2024-08-05',
                start_time: '15:50:00',
                end_time: '17:00:00',
            },
            {
                day: '2024-08-06',
                start_time: '15:50:00',
                end_time: '17:00:00',
            },
        ],
    };
    const form = useForm<IFormSchedule>({ resolver: zodResolver(FormScheduleSchema) });

    const onSubmit: SubmitHandler<IFormSchedule> = async (data) => {
        try {
            const formData = {
                schedules: [
                    {
                        day: data.day,
                        start_time: `${data.start_time}:00`,
                        end_time: `${data.end_time}:00`,
                    },
                ],
            };

            await createSchedule(formData);
            onCloseModal();
        } catch (error) {
            // console.error('Error submitting schedule:', error);
            toast({ title: 'Sửa dịch vụ Thất bại!', status: 'destructive' });
        }
    };

    return (
        <div className='mx-auto flex w-[30vw] flex-col justify-center'>
            {
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField
                            control={form.control}
                            name='day'
                            render={({ field }) => {
                                const displayTimeWorking = (e: string) => {
                                    const day = dataWorkingTime.data.find((item) => item.day === e);
                                    setDescriptionWokingTime(`mở cửa từ ${day?.start_time} đến ${day?.end_time}`);
                                    field.onChange(e);
                                };
                                return (
                                    <FormItem className='my-3 flex flex-col gap-2'>
                                        <FormLabel>
                                            Ngày cửa hàng mở cửa <span className='text-[#e41a0f]'>*</span>
                                        </FormLabel>
                                        <Select onValueChange={(e) => displayTimeWorking(e)}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Chọn ngày làm' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {dataWorkingTime.data.map((e, i) => (
                                                    <SelectItem key={i} value={e.day}>
                                                        {e.day}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>{descriptionWokingTime}</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <div className='flex justify-center gap-2'>
                            <FormField
                                control={form.control}
                                name='start_time'
                                render={({ field }) => {
                                    return (
                                        <FormItemDisplay
                                            title='Giờ bắt đầu làm '
                                            placeholder='Nhập giờ bắt đầu làm !'
                                            {...field}
                                            require
                                            type='time'
                                        />
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name='end_time'
                                render={({ field }) => {
                                    return (
                                        <FormItemDisplay
                                            title='Giờ nghỉ làm '
                                            placeholder='Nhập giờ nghỉ làm !'
                                            {...field}
                                            require
                                            type='time'
                                        />
                                    );
                                }}
                            />
                            <FormMessage />
                        </div>
                        <button className='mt-3 flex h-14 w-full flex-col items-center justify-center rounded-md border-transparent bg-card p-3 text-foreground'>
                            Submit
                        </button>
                    </form>
                </Form>
            }
        </div>
    );
};

export default FormSchedule;
