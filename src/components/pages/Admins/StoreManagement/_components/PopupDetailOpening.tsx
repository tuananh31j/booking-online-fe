import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormItemDisplay from '~/components/_common/FormItemDisplay';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { Form, FormField, FormMessage } from '~/components/ui/form';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useUpdateOpeningMutation } from '~/store/services/opening.service';
import { ErrorOpeningHours, isMessageError, isOpeningHourError } from '~/types/Error/Helper/Store';
import { IOpeningByIdStoreResponse } from '~/types/Opening';
import { IStore } from '~/types/Store';

const FormOpeningSchema = z
    .object({
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
    );

export default function PopupDetailOpening({
    children,
    detail,
    store,
}: {
    children: React.ReactNode;
    detail?: IOpeningByIdStoreResponse;
    store: IStore;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [mutate, updateOpeningState] = useUpdateOpeningMutation();
    const handleOpen = () => {
        setIsOpen(!isOpen);
    };
    const toast = useToastDisplay();
    const form = useForm({
        resolver: zodResolver(FormOpeningSchema),
    });
    const handleOnsubmit = async (data: any) => {
        const appendSeconds = (time: string) => (time.includes(':') ? `${time}:00` : `${time}:00`);
        try {
            const formRaw = {
                opening_hours: [
                    {
                        day: detail?.day as string,
                        opening_time:
                            data.opening_time !== (detail?.opening_time ?? data.opening_time)
                                ? appendSeconds(data.opening_time)
                                : data.opening_time,
                        closing_time:
                            data.closing_time !== (detail?.closing_time ?? data.closing_time)
                                ? appendSeconds(data.closing_time)
                                : data.closing_time,
                    },
                ],
            };
            await mutate({
                id: store.id,
                formData: formRaw,
            }).unwrap();
            handleOpen();
            toast({ title: `Sửa giờ mở cửa của ngày ${detail?.day} thành công!`, status: 'success' });
        } catch (error) {
            if (isOpeningHourError(error)) {
                const objectKey = Object.keys(error.data.error) as ErrorOpeningHours[];
                objectKey.forEach((key) => {
                    const messageJoined = error.data.error[key].join(', ');
                    form.setError(key, { message: messageJoined });
                });
            }
            if (isMessageError(error)) {
                toast({ title: `${error.data.message}`, status: 'destructive' });
            }
        }
    };
    useEffect(() => {
        form.reset(detail);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detail, isOpen]);

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className='flex h-[36px] w-[48px] items-center justify-center rounded-sm bg-primary text-reverse'>
                    {children}
                </DialogTrigger>
                <DialogContent style={{ minWidth: '35vw' }}>
                    <DialogHeader>
                        <DialogTitle>
                            <div className='text-2xl font-bold dark:text-white'>Sửa lịch mở cửa: {detail?.day}</div>
                            <div className='mx-auto mt-6 flex flex-col justify-center'>
                                {
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(handleOnsubmit)} className='space-y-8'>
                                            <div className='flex justify-center gap-2'>
                                                <FormField
                                                    control={form.control}
                                                    name='opening_time'
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItemDisplay
                                                                title='Giờ mở cửa '
                                                                placeholder='Nhập giờ bắt đầu mở cửa !'
                                                                {...field}
                                                                require
                                                                type='time'
                                                            />
                                                        );
                                                    }}
                                                />
                                                <FormMessage></FormMessage>

                                                <FormField
                                                    control={form.control}
                                                    name='closing_time'
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItemDisplay
                                                                title='Giờ đóng cửa'
                                                                placeholder='Nhập giờ đóng cửa !'
                                                                {...field}
                                                                require
                                                                type='time'
                                                            />
                                                        );
                                                    }}
                                                />
                                                <FormMessage></FormMessage>
                                            </div>
                                            <button className='mt-3 flex h-14 w-full flex-col items-center justify-center rounded-md border-transparent bg-card p-3 text-foreground'>
                                                Submit
                                            </button>
                                        </form>
                                    </Form>
                                }
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
