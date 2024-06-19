'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import FormItemDisplay from '~/components/_common/FormItemDisplay';
import ButtonSubmit from '~/components/_common/ButtonSubmit';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { useEffect, useState } from 'react';
import { usePostOpeningMutation } from '~/store/services/opening.service';
import useToastDisplay from '~/hooks/useToastDisplay';

const FormOpeningSchema = z.object({
    store_information_id: z.string({ required_error: 'Vui lòng cho cửa hàng!' }),
    day: z.string({ required_error: 'Vui lòng chọn ngày!' }),
    opening_time: z.string({ required_error: 'Vui lòng chọn giờ bắt đầu!' }),
    closing_time: z.string({ required_error: 'Vui lòng chọn giờ kết thúc!' }),
});

type IFormOpening = z.infer<typeof FormOpeningSchema>;

const FormOpening = ({ onCloseModal, id }: { onCloseModal: () => void; id: number }) => {
    const toast = useToastDisplay();
    const [createOpening, createOpeningState] = usePostOpeningMutation();
    const form = useForm<IFormOpening>({ resolver: zodResolver(FormOpeningSchema) });
    const onSubmit: SubmitHandler<IFormOpening> = async (data) => {
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
                            name='store_information_id'
                            render={({ field }) => {
                                return (
                                    <FormItem className='my-3 flex flex-col gap-2'>
                                        <FormLabel>
                                            Chọn cửa hàng mở cửa <span className='text-[#e41a0f]'>*</span>
                                        </FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Chọn ngày làm' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent></SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <div className='flex justify-center gap-2'>
                            <FormField
                                control={form.control}
                                name='day'
                                render={({ field }) => {
                                    console.log(field);
                                    return (
                                        <FormItemDisplay
                                            title='Ngày mở cửa '
                                            placeholder='Nhập Ngày bắt đầu mở cửa !'
                                            {...field}
                                            require
                                            type='date'
                                        />
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name='opening_time'
                                render={({ field }) => {
                                    console.log(field);
                                    return (
                                        <FormItemDisplay
                                            title='Giờ mở cửa '
                                            placeholder='Nhập giờ bắt đầu mở cửa !'
                                            {...field}
                                            require
                                            type='time'
                                        />
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name='closing_time'
                                render={({ field }) => {
                                    return (
                                        <FormItemDisplay
                                            title='Giờ đóng cửa'
                                            placeholder='Nhập giờ đóng cửa !'
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

export default FormOpening;
