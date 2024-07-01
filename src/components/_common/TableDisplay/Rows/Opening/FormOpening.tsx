'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, HelpCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormItemDisplay from '~/components/_common/FormItemDisplay';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import useToastDisplay from '~/hooks/useToastDisplay';
import { cn } from '~/lib/utils';
import { useCreateOpeningMutation, useGetOpeningDetailQuery } from '~/store/services/opening.service';
import { ErrorOpeningHours, isMessageError, isOpeningHourError } from '~/types/Error/Helper/Store';

const FormOpeningSchema = z.object({
    day: z.date({ required_error: 'Vui lòng chọn ngày!' }),
    opening_time: z.string({ required_error: 'Vui lòng chọn giờ bắt đầu!' }),
    closing_time: z.string({ required_error: 'Vui lòng chọn giờ kết thúc!' }),
});

type IFormOpening = z.infer<typeof FormOpeningSchema>;

const FormOpening = ({ onCloseModal, id }: { onCloseModal: () => void; id: number }) => {
    const toast = useToastDisplay();
    const [createOpening, createOpeningState] = useCreateOpeningMutation();
    const { data: OpeningData, isError } = useGetOpeningDetailQuery(id, { skip: !id });
    const opening = OpeningData?.data.data;
    const form = useForm<IFormOpening>({ resolver: zodResolver(FormOpeningSchema) });
    const [dateValid, setValidDay] = useState<Date[] | null>();
    const onSubmit: SubmitHandler<IFormOpening> = async (data) => {
        await new Promise((resolve) => {
            resolve(data);
        });
        try {
            const appendSeconds = (time: string) => (time.includes(':') ? `${time}:00` : `${time}:00:00`);
            const dayFormat = format(data.day, 'yyyy-MM-dd');
            const openingHours = [
                {
                    day: dayFormat,
                    opening_time: appendSeconds(data.opening_time),
                    closing_time: appendSeconds(data.closing_time),
                },
            ];

            const res = await createOpening({
                id,
                formData: {
                    opening_hours: openingHours,
                },
            }).unwrap();
            toast({ title: 'Thêm mới thành công', status: 'success' });
            onCloseModal();
        } catch (error) {
            if (isOpeningHourError(error)) {
                const objectKeys = Object.keys(error.data.error) as ErrorOpeningHours[];
                objectKeys.forEach((key: ErrorOpeningHours) => {
                    const errorMessage = error.data.error[key].join(', ');
                    form.setError(key, { message: errorMessage });
                });
            }
            if (isMessageError(error)) {
                toast({ title: `${error.data.message}`, status: 'destructive' });
            }
        }
    };
    useEffect(() => {
        const disableDay = opening?.map((item) => new Date(item.day));
        if (disableDay) {
            setValidDay(disableDay);
        } else {
            setValidDay(null);
        }
        if (isError) {
            setValidDay(null);
        }
    }, [OpeningData]);
    return (
        <div className='mx-auto flex flex-col justify-center'>
            {
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <div className='flex justify-center gap-2'>
                            <FormField
                                control={form.control}
                                name='day'
                                render={({ field }) => {
                                    return (
                                        <FormItem className='flex flex-col'>
                                            <FormLabel className='flex justify-between'>
                                                <span>
                                                    Ngày mở cửa: <span className='text-[#e41a0f]'>*</span>
                                                </span>
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={'outline'}
                                                            className={cn(
                                                                'w-[240px] pl-3 text-left font-normal',
                                                                !field.value && 'text-muted-foreground'
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, 'PPP')
                                                            ) : (
                                                                <span>Chọn ngày mở cửa</span>
                                                            )}
                                                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-auto p-0' align='start'>
                                                    <Calendar
                                                        mode='single'
                                                        onSelect={field.onChange}
                                                        disabled={(date) => {
                                                            if (!dateValid) {
                                                                return false;
                                                            }
                                                            console.log(dateValid);
                                                            return dateValid.some((validDate) => {
                                                                return (
                                                                    validDate.getFullYear() === date.getFullYear() &&
                                                                    validDate.getMonth() === date.getMonth() &&
                                                                    validDate.getDate() === date.getDate()
                                                                );
                                                            });
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>

                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name='opening_time'
                                render={({ field }) => {
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
                        <button
                            disabled={createOpeningState.isLoading}
                            className='mt-3 flex h-14 w-full flex-col items-center justify-center rounded-md border-transparent bg-card p-3 text-foreground'
                        >
                            Submit
                        </button>
                    </form>
                </Form>
            }
        </div>
    );
};

export default FormOpening;
