'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import FormItemDisplay from '~/components/_common/FormItemDisplay';
import ButtonSubmit from '~/components/_common/ButtonSubmit';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { useState } from 'react';

const FormScheduleSchema = z.object({
    day: z.string({ required_error: 'Vui lòng chọn ngày!' }),
    start_time: z.string({ required_error: 'Vui lòng chọn giờ bắt đầu làm!' }),
    end_time: z.string({ required_error: 'Vui lòng chọn giờ nghỉ làm!' }),
});

type IFormSchedule = z.infer<typeof FormScheduleSchema>;

const FormSchedule = ({ onCloseModal, id }: { onCloseModal: () => void; id: number }) => {
    const [descriptionWokingTime, setDescriptionWokingTime] = useState('');

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
        await new Promise((resolve) => {
            resolve(data);
        });
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
                                field.onChange = (e) => {
                                    const day = dataWorkingTime.data.find((item) => item.day === e);
                                    setDescriptionWokingTime(`mở cửa từ ${day?.start_time} đến ${day?.end_time}`);
                                };
                                return (
                                    <FormItem className='my-3 flex flex-col gap-2'>
                                        <FormLabel>
                                            Ngày cửa hàng mở cửa <span className='text-[#e41a0f]'>*</span>
                                        </FormLabel>
                                        <Select onValueChange={field.onChange}>
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
                                    console.log(field);
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
                            <FormMessage></FormMessage>
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
