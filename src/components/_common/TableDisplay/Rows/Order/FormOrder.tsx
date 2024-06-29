'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import ButtonSubmit from '~/components/_common/ButtonSubmit';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { useUpdateBookingStatusMutation } from '~/store/services/booking.service';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

const FormOrder = ({ onCloseModal, id }: { onCloseModal: () => void; id: number }) => {
    const t = useTranslations('Table.Booking');
    const toast = useToastDisplay();

    const [updateStatus, updateStatusState] = useUpdateBookingStatusMutation();

    const FormUpdateOrderSchema = z.object({
        status: z.string({ required_error: 'Please choose!' }),
    });

    type IFormStatusSchema = z.infer<typeof FormUpdateOrderSchema>;

    const form = useForm<IFormStatusSchema>({
        resolver: zodResolver(FormUpdateOrderSchema),
    });

    const onSubmit: SubmitHandler<IFormStatusSchema> = async (data) => {
        try {
            const bookingId = id;

            const req = {
                bodyReq: {
                    status: data.status,
                },
                id: bookingId,
            };

            updateStatus(req);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (updateStatusState.isSuccess) {
            toast({ title: t('update.success'), status: 'success' });

            onCloseModal();
        }
        if (updateStatusState.isError) {
            toast({ title: t('update.fail'), status: 'destructive' });
            onCloseModal();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateStatusState]);

    return (
        <div className='mx-auto flex w-[30vw] flex-col justify-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name='status'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Status <span className='text-[#e41a0f]'>*</span>
                                </FormLabel>

                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Update status' />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        <SelectItem value='doing'>Doing</SelectItem>
                                        <SelectItem value='confirmed'>Confirm</SelectItem>
                                        <SelectItem value='done'>Done</SelectItem>
                                        <SelectItem value='canceled'>Cancel</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <ButtonSubmit isSubmitting={form.formState.isSubmitting} name='Submit' />
                </form>
            </Form>
        </div>
    );
};

export default FormOrder;
