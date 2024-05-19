'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CalendarBooking } from '~/components/ui/calendarBooking';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog';
import MapIcon from '~/components/_icons/map/Map';
import mapImage from '~/assets/images/map.png';
import Image from 'next/image';
import { Form, FormField, FormItem, FormMessage } from '~/components/ui/form';

const message = 'Bạn chưa chọn ngày đặt lịch!';
const FormSchema = z.object({
    dob: z.date({
        required_error: `${message}`,
    }),
});
const BookingCalendar = () => {
    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() - 1);
    const endMonth = new Date();
    endMonth.setMonth(endMonth.getMonth() + 2);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const { dob } = data;
        console.log(dob);
    }

    return (
        <>
            <div className='details mb-[15px] flex items-center justify-between text-2xl text-default'>
                <span className='font-medium'>
                    Nailkitchen 1 - 62 Tu Hoa, Tay Ho (Westlake Area - near Sheraton Hotel)
                </span>
                <Dialog>
                    <div className='hidden md:flex md:items-center'>
                        <DialogTrigger>
                            <MapIcon className='w-8 dark:invert' />
                        </DialogTrigger>
                    </div>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>You can find us here</DialogTitle>

                            <DialogDescription>
                                <Image
                                    src={mapImage.src}
                                    alt='map-img'
                                    width={mapImage.width}
                                    height={mapImage.height}
                                    quality={100}
                                    className='w-full'
                                />

                                <div className='details px-16 py-6 text-center text-2xl dark:text-white'>
                                    <div className='address font-semibold'>
                                        Nailkitchen 1 - 62 Tu Hoa, Tay Ho (Westlake Area - near Sheraton Hotel)
                                    </div>

                                    <div className='small-address text-lg font-medium'>
                                        62 Từ Hoa, Hanoi, Hanoi, 10000.
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='bg-content py-20'>
                <Form {...form}>
                    <form className='w-full' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='dob'
                            render={({ field }) => (
                                <FormItem className='flex justify-center'>
                                    <CalendarBooking
                                        className='rounded-2xl border-[1px] border-[#D5D4DF] bg-reverse p-12 shadow-xl dark:border-reverse'
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
                                                        Xác Nhận
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
