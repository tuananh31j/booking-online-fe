// 'use client';

import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '~/components/ui/form';
import FormItemDisplay from '~/components/_common/FormItemDisplay';
import ButtonSubmit from '~/components/_common/ButtonSubmit';
// import { useRouter } from 'next/router';
// import { redirect } from 'next/navigation';

const bookingConfirmSchema = z.object({
    email: z.string({ required_error: 'Email không được để trống!' }).email('Email không hợp lệ!'),
    fullName: z.string().nonempty('Họ và tên không được để trống!'),
    phone: z.string().nonempty('Số điện thoại không được để trống!'),
    dateBooking: z.string().nonempty('Ngày đặt không được để trống!'),
});

type IBookingConfirmSchema = z.infer<typeof bookingConfirmSchema>;

const ConfirmationForm = () => {
    // const router = useRouter();
    const t = useTranslations('ConfirmBookingForm');
    const form = useForm<IBookingConfirmSchema>({ resolver: zodResolver(bookingConfirmSchema) });
    const onSubmit: SubmitHandler<IBookingConfirmSchema> = async (data) => {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
        try {
            console.log(data);
            // redirect('/ordersuccess');
            // router.push('/ordersuccess');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='mx-auto flex w-[30vw] flex-col justify-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
                        name='dateBooking'
                        render={({ field }) => <FormItemDisplay title='Pick a date' {...field} require type='date' />}
                    />
                    <ButtonSubmit isSubmitting={form.formState.isSubmitting} name={t('confirm')} />
                </form>
            </Form>
        </div>
    );
};

export default ConfirmationForm;
