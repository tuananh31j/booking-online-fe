'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormItemDisplay from '~/components/_common/FormItemDisplay';
import { Form, FormField, FormMessage } from '~/components/ui/form';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useCreateOpeningMutation } from '~/store/services/opening.service';
import { useGetListStoreQuery } from '~/store/services/store.service';

const FormOpeningSchema = z.object({
    day: z.string({ required_error: 'Vui lòng chọn ngày!' }),
    opening_time: z.string({ required_error: 'Vui lòng chọn giờ bắt đầu!' }),
    closing_time: z.string({ required_error: 'Vui lòng chọn giờ kết thúc!' }),
});

type IFormOpening = z.infer<typeof FormOpeningSchema>;

const FormOpening = ({ onCloseModal, id }: { onCloseModal: () => void; id: number }) => {
    const toast = useToastDisplay();
    const [createOpening, createOpeningState] = useCreateOpeningMutation();
    const { data: storeList, isLoading: isStoreLoading } = useGetListStoreQuery();

    const form = useForm<IFormOpening>({ resolver: zodResolver(FormOpeningSchema) });
    const idStore = storeList?.data.data.find((store) => store.id === id)?.id;

    const onSubmit: SubmitHandler<IFormOpening> = async (data) => {
        await new Promise((resolve) => {
            resolve(data);
        });
        try {
            const appendSeconds = (time: string) => (time.includes(':') ? `${time}:00` : `${time}:00:00`);

            const openingHours = [
                {
                    day: data.day,
                    opening_time: appendSeconds(data.opening_time),
                    closing_time: appendSeconds(data.closing_time),
                },
            ];

            const res = await createOpening({
                id,
                formData: {
                    opening_hours: openingHours,
                },
            }).unwrap();
            if (res.data) {
                toast({ title: 'Thêm mới thành công', status: 'success' });
                onCloseModal();
            }
        } catch (error) {
            toast({ title: 'Thêm mới thất bại', status: 'destructive' });
        }
    };
    return (
        <div className='mx-auto flex flex-col justify-center'>
            {
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <div className='flex justify-center gap-2'>
                            <FormField
                                control={form.control}
                                name='day'
                                render={({ field }) => {
                                    // console.log(field);
                                    return (
                                        <FormItemDisplay
                                            title='Ngày mở cửa '
                                            placeholder='Nhập Ngày bắt đầu mở cửa !'
                                            {...field}
                                            require
                                            type='date'
                                        />
                                    );
                                }}
                            />

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
    );
};

export default FormOpening;
