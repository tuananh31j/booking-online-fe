'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CalendarBooking } from '~/components/ui/calendarBooking';
import { Form, FormField, FormItem, FormMessage } from '~/components/ui/form';

const BookingCalendar = () => {
    const t = useTranslations('Calendar');

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
        const formated = format(new Date(dob), 'MM/dd/yyyy');
        console.log(formated);
    }

    return (
        <>
            <div className='bg-content py-10'>
                <Form {...form}>
                    <form className='w-full' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='dob'
                            render={({ field }) => (
                                <FormItem className='flex justify-center'>
                                    <CalendarBooking
                                        className='rounded-2xl border-[1px] border-[#D5D4DF] bg-reverse p-5 shadow-xl dark:border-reverse'
                                        fromMonth={new Date()}
                                        toMonth={endMonth}
                                        mode='single'
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < dateNow}
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
            </div>
        </>
    );
};

export default BookingCalendar;
