'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ArrowBigLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ScheduleTimePicker from '~/components/_common/TableDisplay/Rows/Schedule/ScheduleTimePicker';
import TimePicker from '~/components/elements/TimePicker';
import { CalendarBooking } from '~/components/ui/calendarBooking';
import { Form, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { IOpeningHoursResponse } from '~/types/Staff';

const ScheduleCalendar = ({ dataWorkingTime }: { dataWorkingTime: IOpeningHoursResponse[] }) => {
    const [choosedDate, setChoosedDate] = useState('');
    const t = useTranslations('Calendar');
    const [chooseTime, setChoosTime] = useState<boolean>(false);
    const dayOff = 'Sun';
    // || date.toDateString().startsWith(dayOff)

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

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const { dob } = data;
        const formated = format(new Date(dob), 'yyyy-MM-dd');
        setChoosedDate(formated);
        setChoosTime(true);
    }

    return (
        <>
            <div className='overflow-y-scroll bg-content hide-scrollbar' style={{ maxHeight: 653 }}>
                {!chooseTime && (
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
                                            onSelect={field.onChange}
                                            disabled={(date) => {
                                                return date.toDateString().startsWith(dayOff) || date < dateNow;
                                            }}
                                            initialFocus
                                            footer={
                                                <>
                                                    <FormMessage className='text-center text-2xl' />
                                                    <div className='mt-[15px] flex justify-center'>
                                                        <button
                                                            type='submit'
                                                            className='h-[45px] w-[128px] rounded-xl bg-default text-reverse'
                                                        >
                                                            {t('confirm')}
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
                )}
                {chooseTime && (
                    <div className='bg-white'>
                        <div className='flex cursor-pointer' onClick={() => setChoosTime(false)}>
                            {' '}
                            <ArrowBigLeft />
                            Back to Choose Date
                        </div>

                        <div className=' mt-4 overflow-y-scroll hide-scrollbar ' style={{ maxHeight: 525 }}>
                            <ScheduleTimePicker
                                hours={dataWorkingTime.filter((e) => e.day === choosedDate)}
                                choosedDate={choosedDate}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ScheduleCalendar;
