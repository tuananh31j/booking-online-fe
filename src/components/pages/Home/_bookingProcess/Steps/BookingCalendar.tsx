'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TimePicker from '~/components/elements/TimePicker';
import { CalendarBooking } from '~/components/ui/calendarBooking';
import { Form, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { useGetListWorkScheduleStaffClientQuery } from '~/store/services/staff.service';
import WrapperBooking from '../WrapperBooking';
import useBooking from '~/hooks/useBooking';

const BookingCalendar = () => {
    const t = useTranslations('Calendar');
    const [dateValid, setDateValid] = useState<Date[]>();
    const { bookingInfo } = useBooking();
    const [pickDay, setPickDay] = useState<string>();

    // @query
    const { data: listWorkSchedule, isLoading } = useGetListWorkScheduleStaffClientQuery(bookingInfo.user!.id);
    // @side effect
    useEffect(() => {
        const specialDays = listWorkSchedule?.data.data.schedules.map((item) => new Date(item.day));
        if (specialDays) {
            setDateValid(specialDays);
        }
    }, [isLoading, listWorkSchedule]);
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
        setPickDay(formated);
    }
    const isPickedTime = Boolean(bookingInfo.time && bookingInfo.day);
    return (
        <WrapperBooking
            stepKeyTranslation='step_dateTime'
            isButtonNextStep={{ active: isPickedTime, isHide: false }}
            isLoading={isLoading}
        >
            <div className='relative'>
                <div className='absolute'>
                    <p>{t('annotation')}:</p>
                    <div className='my-4 flex items-center gap-2'>
                        <div className='h-7 w-7 rounded-sm border border-transparent bg-green-800'></div>
                        <span>Recommend</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='h-7 w-7 rounded-sm border border-card-foreground bg-transparent'></div>
                        <span>Disable</span>
                    </div>
                </div>
                {listWorkSchedule && (
                    <>
                        <Form {...form}>
                            <form className='w-full' onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name='dob'
                                    render={({ field }) => (
                                        <FormItem className='flex justify-center'>
                                            <div className='h-[100px overflow-scroll]'>
                                                <CalendarBooking
                                                    specialDays={dateValid}
                                                    className='rounded-2xl border-[1px] border-[#D5D4DF] border-reverse bg-reverse p-5 shadow-xl'
                                                    fromMonth={dateNow}
                                                    mode='single'
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => {
                                                        if (!dateValid) {
                                                            return true;
                                                        }
                                                        return !dateValid.some((validDate) => {
                                                            return (
                                                                validDate.getFullYear() === date.getFullYear() &&
                                                                validDate.getMonth() === date.getMonth() &&
                                                                validDate.getDate() === date.getDate()
                                                            );
                                                        });
                                                    }}
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
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                        {pickDay && (
                            <div className='my-10 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-12'>
                                <TimePicker day={pickDay} />
                            </div>
                        )}
                    </>
                )}
                {!listWorkSchedule && <p className='text-center'>{t('date_is_not_valid')}</p>}
            </div>
        </WrapperBooking>
    );
};

export default BookingCalendar;
