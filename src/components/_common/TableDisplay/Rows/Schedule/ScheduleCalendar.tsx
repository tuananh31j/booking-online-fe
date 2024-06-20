'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CalendarBooking } from '~/components/ui/calendarBooking';
import { Form, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { IOpeningHoursResponse } from '~/types/Staff';

const ScheduleCalendar = ({
    dataWorkingTime,
    fakeData,
    handleAddDate,
    formMessage,
    setChoosingDate,
}: {
    dataWorkingTime?: IOpeningHoursResponse[];
    fakeData: { day: string; opening_time: string; closing_time: string }[];
    handleAddDate: (data?: IOpeningHoursResponse) => void;
    formMessage: string;
    setChoosingDate: (state: boolean) => void;
}) => {
    console.log(dataWorkingTime);
    const t = useTranslations('Calendar');

    const openTime = 9;
    const closeTime = 18;
    const hours: number[] = [];

    for (let i = openTime; i <= closeTime; i += 1) {
        hours.push(i);
    }
    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() - 1);
    const FormSchema = z.object({
        dob: z.date({
            required_error: `${t('validate')}`,
        }),
    });
    const endMonth = new Date();
    endMonth.setMonth(endMonth.getMonth() + 2);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const [matchDate, setMatchDate] = useState<IOpeningHoursResponse>();

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const { dob } = data;
        const formated = format(new Date(dob), 'yyyy-MM-dd');

        setMatchDate(fakeData.find((e) => e.day === formated));
    }

    return (
        <>
            <div className='overflow-y-scroll bg-content hide-scrollbar' style={{ maxHeight: 653 }}>
                {(matchDate && (
                    <span>
                        {' '}
                        Giờ mở cửa: {matchDate.opening_time} - {matchDate.closing_time}{' '}
                    </span>
                )) ||
                    'Ngày này cửa hàng chưa mở cửa!'}
                {
                    <Form {...form}>
                        <form className='w-full' onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='dob'
                                render={({ field }) => (
                                    <FormItem className='flex justify-center'>
                                        <CalendarBooking
                                            className='rounded-2xl border-[1px] border-[#D5D4DF] bg-reverse  shadow-xl dark:border-reverse '
                                            fromMonth={dateNow}
                                            toMonth={endMonth}
                                            mode='single'
                                            selected={field.value}
                                            // onSelect={field.onChange}
                                            onSelect={(date) => {
                                                field.onChange(date);
                                                form.handleSubmit((data) => {
                                                    onSubmit(data);
                                                })();
                                            }}
                                            disabled={(date) => {
                                                return fakeData.find(
                                                    (e) => e.day === format(new Date(date), 'yyyy-MM-dd')
                                                )
                                                    ? false
                                                    : true;
                                            }}
                                            initialFocus
                                            footer={
                                                <>
                                                    <FormMessage className='text-center text-sm'>
                                                        {formMessage}
                                                    </FormMessage>
                                                    <div className='mt-[15px] flex justify-between'>
                                                        <button
                                                            onClick={() => setChoosingDate(false)}
                                                            type='button'
                                                            className='h-[45px] w-[128px] rounded-xl bg-default text-reverse'
                                                        >
                                                            Back
                                                        </button>
                                                        <button
                                                            onClick={() => handleAddDate(matchDate)}
                                                            type='submit'
                                                            className='h-[45px] w-[128px] rounded-xl bg-default text-reverse'
                                                        >
                                                            Choose
                                                        </button>
                                                    </div>
                                                </>
                                            }
                                        />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                }
            </div>
        </>
    );
};

export default ScheduleCalendar;
