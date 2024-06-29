// 'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import ButtonSubmit from '~/components/_common/ButtonSubmit';
import FormItemDisplay from '~/components/_common/FormItemDisplay';
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/components/ui/form';
import { Textarea } from '~/components/ui/textarea';
import useBooking from '~/hooks/useBooking';
import useToastDisplay from '~/hooks/useToastDisplay';
import StaticImages from '~/static';
import { useCreateBookingMutation } from '~/store/services/booking.service';
import { ErrorFields, isBookingError } from '~/types/Error/Helper/Booking';

const bookingConfirmSchema = z.object({
    email: z.string({ required_error: 'Email không được để trống!' }).email('Email không hợp lệ!'),
    fullName: z.string({ required_error: 'Email không được để trống!' }),
    phone: z.string({ required_error: 'Số điện thoại không được để trống!' }),
    date: z.string({ required_error: 'Ngày đặt không được để trống!' }),
    note: z.string().optional(),
});

type IBookingConfirmSchema = z.infer<typeof bookingConfirmSchema>;

const ConfirmationForm = () => {
    const t = useTranslations('ConfirmBookingForm');
    const { bookingInfo, servicesName, submitconfirm, resetStepBooking } = useBooking();
    const toast = useToastDisplay();
    const router = useRouter();

    // @query
    const [createBooking, { isSuccess, isError, error: createBookingError, isLoading }] = useCreateBookingMutation();
    const form = useForm<IBookingConfirmSchema>({ resolver: zodResolver(bookingConfirmSchema) });

    const onSubmit: SubmitHandler<IBookingConfirmSchema> = async (data) => {
        await new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
        const booking = {
            customer_name: data.fullName,
            customer_date: data.date,
            customer_phone: data.phone,
            customer_note: data.note,
            customer_email: data.email,
            user_id: bookingInfo.user!.id,
            time: bookingInfo.time,
            service_ids: bookingInfo.service_ids,
            day: bookingInfo.day,
        };
        createBooking(booking)
            .unwrap()
            .then((booked) => {
                if (booked) {
                    console.log(booked);
                    submitconfirm(booked.data);
                    resetStepBooking();
                }
                router.replace('/ordersuccess');
                toast({ title: 'Confirm booking successfully!', status: 'success' });
            })
            .catch((error) => {
                console.error('Failed to edit category', error);
            });
    };
    useEffect(() => {
        if (isBookingError(createBookingError)) {
            const errorsKey = Object.keys(createBookingError.data.error) as ErrorFields[];
            const errors = createBookingError.data.error;
            errorsKey.forEach((key) => {
                const firstMessage = errors[key][0];
                form.setError(key, { message: firstMessage });
            });
        }
        if (isSuccess) {
            toast({ title: 'Confirm booking successfully!', status: 'success' });
        }
        if (isError) {
            toast({ title: 'Confirm booking failed!', status: 'destructive' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isError]);
    return (
        <div className='mx-auto grid grid-cols-12 items-start justify-between rounded-lg bg-form px-5 py-6'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='col-span-6'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItemDisplay
                                title={t('Email.label')}
                                placeholder={t('Email.placeholder')}
                                {...field}
                                require
                                type='text'
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='fullName'
                        render={({ field }) => (
                            <FormItemDisplay
                                title={t('Fullname.label')}
                                placeholder={t('Fullname.placeholder')}
                                {...field}
                                require
                                type='text'
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='phone'
                        render={({ field }) => (
                            <FormItemDisplay
                                title={t('phonenumber.label')}
                                placeholder={t('phonenumber.placeholder')}
                                {...field}
                                require
                                type='text'
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='date'
                        render={({ field }) => <FormItemDisplay title='Birthday' {...field} require type='date' />}
                    />
                    <FormField
                        control={form.control}
                        name='note'
                        render={({ field }) => (
                            <FormItem className='mb-3 flex w-full flex-col'>
                                <FormLabel>{t('note.label')}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        className='w-full rounded-[3px] border border-gray-500 p-2 focus:border-card'
                                        rows={3}
                                        placeholder={t('note.placeholder')}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <ButtonSubmit isSubmitting={form.formState.isSubmitting || isLoading} name={t('confirm')} />
                </form>
            </Form>
            <div className='col-span-1'></div>
            <div className='col-span-5'>
                <ul>
                    <li>
                        <div>
                            <span className='font-bold'>{t('pickedDate')}:</span> <span>{bookingInfo.day}</span>{' '}
                            <span className='font-bold'>{t('hour')}:</span> <span>{bookingInfo.time}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span className='font-bold'>{t('staff')}:</span>{' '}
                            <ul className='ml-10 list-disc'>
                                <li>
                                    <Image
                                        src={bookingInfo.user?.image || StaticImages.userImageDf}
                                        width={400}
                                        height={400}
                                        className='h-8 w-8 object-cover'
                                        alt='avt'
                                    />
                                </li>
                                <li>{bookingInfo.user?.name}</li>
                                <li>{bookingInfo.user?.phone}</li>
                                <li>{bookingInfo.user?.email}</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span className='font-bold'>{t('conf')}:</span>{' '}
                            <ul className='ml-10 list-disc'>
                                <li>{bookingInfo.store?.name}</li>
                                {bookingInfo.store?.phone && <li>{bookingInfo.store?.phone}</li>}
                                <li>{bookingInfo.store?.address}</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span className='font-bold'>{t('services')}:</span>{' '}
                            <ul className='ml-10 list-disc'>
                                {servicesName.map((item) => (
                                    <li key={item.id}>{item.name}</li>
                                ))}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Toast message */}
        </div>
    );
};

export default ConfirmationForm;
