'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format, getHours, parse } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TimePicker from '~/components/elements/TimePicker';
import { CalendarBooking } from '~/components/ui/calendarBooking';
import { Form, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { useGetListWorkScheduleStaffClientQuery } from '~/store/services/staff.service';
import WrapperBooking from '../WrapperBooking';

const BookingCalendar = () => {
    const t = useTranslations('Calendar');
    const [chooseDate, setChooseDate] = useState<string>('');
    const [workTime, setWorkTime] = useState<{ start: string; end: string } | null>(null);
    const [workDate, setWorkDate] = useState<Date[]>([]);
    const [hours, setHours] = useState<number[]>([]);
    const dayOff = 'Sun';
    const { data: listWorkSchedule, isLoading } = useGetListWorkScheduleStaffClientQuery();
    useEffect(() => {
        const specialDays = listWorkSchedule?.data.data.map((item) => new Date(item.day));
        if (specialDays) {
            setWorkDate(specialDays);
        }
        if (chooseDate && workTime) {
            const hoursArr: number[] = [];
            const start = parse(workTime.start, 'HH:mm:ss', new Date());
            const end = parse(workTime.end, 'HH:mm:ss', new Date());

            const hourStart = getHours(start);
            const hourEnd = getHours(end);
            for (let i = hourStart; i <= hourEnd; i += 1) {
                hoursArr.push(i);
            }
            setHours(hoursArr);
        }
    }, [isLoading, workTime]);
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
        console.log(formated);
        setChooseDate(formated);
        listWorkSchedule?.data.data.forEach((item) => {
            if (item.day === formated) {
                setWorkTime({ start: item.start_time, end: item.end_time });
            }
        });
    }

    return (
        <WrapperBooking stepKeyTranslation='step_dateTime' isLoading={isLoading}>
            <div className='relative'>
                <div className='absolute'>
                    <p>Chú thích:</p>
                    <div className='my-4 flex items-center gap-2'>
                        <div className='h-7 w-7 rounded-sm border border-transparent bg-green-800'></div>
                        <span>Recommend</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='h-7 w-7 rounded-sm border border-card-foreground bg-transparent'></div>{' '}
                        <span>Disable</span>
                    </div>
                </div>
                {listWorkSchedule && (
                    <div className='bg-content'>
                        <Form {...form}>
                            <form className='w-full' onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name='dob'
                                    render={({ field }) => (
                                        <FormItem className='flex justify-center'>
                                            <CalendarBooking
                                                specialDays={workDate}
                                                className='rounded-2xl border-[1px] border-[#D5D4DF] bg-reverse p-5 shadow-xl dark:border-reverse'
                                                fromMonth={dateNow}
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
                        {chooseDate && (
                            <div className='mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6'>
                                <TimePicker hours={hours} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </WrapperBooking>
    );
};

export default BookingCalendar;
