import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { IOpeningByIdStoreResponse } from '~/types/Opening';
import { IStore } from '~/types/Store';
import FormItemDisplay from '~/components/_common/FormItemDisplay';
import { Form, FormControl, FormField, FormLabel, FormMessage } from '~/components/ui/form';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useUpdateOpeningMutation } from '~/store/services/opening.service';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Button } from '~/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '~/components/ui/calendar';
import { cn } from '~/lib/utils';
import { format } from 'date-fns';
import { isMessageError } from '~/types/Error/Helper/Store';

const FormOpeningSchema = z.object({
    opening_time: z.string({ required_error: 'Vui lòng chọn giờ bắt đầu!' }),
    closing_time: z.string({ required_error: 'Vui lòng chọn giờ kết thúc!' }),
});

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
    const handleOnsubmit = (data: any) => {
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
            console.log(formRaw);
            mutate({
                id: store.id,
                formData: formRaw,
            });
        } catch (error) {
            toast({ title: 'Có lỗi xảy ra', status: 'destructive' });
        }
    };
    useEffect(() => {
        form.reset(detail);
    }, [detail, isOpen]);
    useEffect(() => {
        if (isMessageError(updateOpeningState.error)) {
            toast({ title: `${updateOpeningState.error.data.message}`, status: 'destructive' });
        }
        if (updateOpeningState.isSuccess) {
            handleOpen();
            toast({ title: `Sửa giờ mở cửa của ngày ${detail?.day} thành công!`, status: 'success' });
        }
    }, [updateOpeningState]);
    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className='flex h-[36px] w-[48px] items-center justify-center rounded-sm bg-primary text-reverse'>
                    {children}
                </DialogTrigger>
                <DialogContent>
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
                                                        // console.log(field);
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
