'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormItemDisplay from '~/components/_common/FormItemDisplay';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Checkbox } from '~/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import useToastDisplay from '~/hooks/useToastDisplay';
import { cn } from '~/lib/utils';
import {
    useCreateOpeningMutation,
    useGetOpeningDetailQuery,
    useQuickCreateOpeningMutation,
} from '~/store/services/opening.service';
import { ErrorOpeningHours, isMessageError, isOpeningHourError } from '~/types/Error/Helper/Store';

const FormOpeningSchema = z
    .object({
        day: z.date({ required_error: 'Vui lòng chọn ngày!' }),
        opening_time: z.string({ required_error: 'Vui lòng chọn giờ bắt đầu!' }),
        closing_time: z.string({ required_error: 'Vui lòng chọn giờ kết thúc!' }),
    })
    .refine(
        (data) => {
            const openingTime = new Date(`01/01/2000 ${data.opening_time}`);
            const closingTime = new Date(`01/01/2000 ${data.closing_time}`);
            return openingTime < closingTime;
        },
        { message: `Giờ đóng cửa phải sau giờ mở cửa!`, path: ['closing_time'] }
    )
    .refine(
        (data) => {
            const selectedDate = new Date(data.day);
            const currentDate = new Date();
            currentDate.setDate(new Date().getDate() - 1);
            return selectedDate >= currentDate;
        },
        {
            message: 'Không được chọn ngày trong quá khứ!',
            path: ['day'],
        }
    );

type IFormOpening = z.infer<typeof FormOpeningSchema>;

const FormOpening = ({ onCloseModal, id }: { onCloseModal: () => void; id: number }) => {
    const t = useTranslations('Table.Store.settings.opening_hours.form');

    const toast = useToastDisplay();
    const [quickCreate, setQuickCreate] = useState(false);
    const idQuickCreate = useId();
    const [createOpening] = useCreateOpeningMutation();
    const [quickCreateOpening] = useQuickCreateOpeningMutation();
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

            if (!quickCreate) {
                await createOpening({
                    id,
                    formData: {
                        opening_hours: openingHours,
                    },
                }).unwrap();
                toast({ title: t('success'), status: 'success' });
                onCloseModal();
            }
            if (quickCreate) {
                await quickCreateOpening({
                    id,
                    formData: {
                        start_date: dayFormat,
                        opening_time: appendSeconds(data.opening_time),
                        closing_time: appendSeconds(data.closing_time),
                    },
                }).unwrap();
                toast({ title: t('success_5'), status: 'success' });
                onCloseModal();
            }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [OpeningData]);
    return (
        <div className='mx-auto flex flex-col justify-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <div className='flex justify-center gap-2'>
                        <FormField
                            control={form.control}
                            name='day'
                            render={({ field }) => {
                                return (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel className='flex justify-between'>
                                            {!quickCreate && (
                                                <span>
                                                    {t('label_day')} <span className='text-[#e41a0f]'>*</span>
                                                </span>
                                            )}
                                            {quickCreate && (
                                                <span>
                                                    {t('label_fast_5')} <span className='text-[#e41a0f]'>*</span>
                                                </span>
                                            )}
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-[240px] rounded-[3px]  border-gray-500 pl-3 text-left font-normal',
                                                            !field.value && 'text-muted-foreground'
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, 'yyyy-MM-dd')
                                                        ) : quickCreate ? (
                                                            <span>{t('label_fast_5')} </span>
                                                        ) : (
                                                            <span>{t('label_day')} </span>
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
                                                        const currentDate = new Date();
                                                        currentDate.setDate(new Date().getDate() - 1);
                                                        if (date < currentDate) {
                                                            return true;
                                                        }
                                                        if (dateValid && dateValid.length > 0) {
                                                            return dateValid.some((validDate) => {
                                                                return (
                                                                    validDate.getFullYear() === date.getFullYear() &&
                                                                    validDate.getMonth() === date.getMonth() &&
                                                                    validDate.getDate() === date.getDate()
                                                                );
                                                            });
                                                        }
                                                        return false;
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
                                    <FormItemDisplay title={t('label_opening_time')} {...field} require type='time' />
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name='closing_time'
                            render={({ field }) => {
                                return (
                                    <FormItemDisplay title={t('label_closing_time')} {...field} require type='time' />
                                );
                            }}
                        />
                        <FormMessage></FormMessage>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Checkbox id={idQuickCreate} onCheckedChange={() => setQuickCreate(!quickCreate)} />
                        <label
                            htmlFor={idQuickCreate}
                            className='cursor-pointer select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                            {t('add_5_btn')}
                        </label>
                    </div>
                    <button className='mt-3 flex h-14 w-full flex-col items-center justify-center rounded-md border-transparent bg-card p-3 text-foreground'>
                        {t('submit')}
                    </button>
                </form>
            </Form>
        </div>
    );
};

export default FormOpening;
