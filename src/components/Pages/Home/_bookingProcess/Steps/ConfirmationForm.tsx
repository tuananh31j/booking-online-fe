'use client';

import { useTranslations } from 'next-intl';
import FormField from '~/components/_common/FormField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ButtonSubmit from '~/components/_common/ButtonSubmit';
import ShowValitaion from '~/components/_common/ShowValidation';
import { useRouter } from 'next/navigation';

const bookingConfirmSchema = z.object({
    email: z.string().email('Email không hợp lệ!').nonempty('Email không được để trống!'),
    fullName: z.string().nonempty('Họ và tên không được để trống!'),
    phone: z.string().nonempty('Số điện thoại không được để trống!'),
    dateBooking: z.string().nonempty('Ngày đặt không được để trống!'),
});

type IBookingConfirmSchema = z.infer<typeof bookingConfirmSchema>;

const ConfirmationForm = () => {
    const router = useRouter();
    const t = useTranslations('ConfirmBookingForm');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IBookingConfirmSchema>({ resolver: zodResolver(bookingConfirmSchema) });
    const onSubmit: SubmitHandler<IBookingConfirmSchema> = async (data) => {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
        try {
            console.log(data);
            router.push('/ordersuccess');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className=' flex items-center justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='mb-4 w-[500px]'>
                <FormField
                    {...register('fullName')}
                    title={t('Fullname.label')}
                    type='text'
                    placeholder={t('Fullname.placeholder')}
                />
                <ShowValitaion errorField={errors.fullName} />

                <FormField
                    {...register('email')}
                    title={t('Email.label')}
                    type='email'
                    placeholder={t('Email.placeholder')}
                />
                <ShowValitaion errorField={errors.email} />

                <div className='flex items-end gap-4'>
                    <span>
                        <FormField
                            {...register('phone')}
                            title={t('phonenumber.label')}
                            type='text'
                            placeholder={t('phonenumber.placeholder')}
                        />
                        <ShowValitaion errorField={errors.phone} />
                    </span>
                    <span>
                        <FormField {...register('dateBooking')} title={'Pick a date'} type='date' />
                        <ShowValitaion errorField={errors.dateBooking} />
                    </span>
                </div>
                <ButtonSubmit isSubmitting={isSubmitting} name={t('confirm')} />
            </form>
        </div>
    );
};

export default ConfirmationForm;
