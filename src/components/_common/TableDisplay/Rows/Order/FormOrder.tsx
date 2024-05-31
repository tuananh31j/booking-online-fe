'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import ButtonSubmit from '~/components/_common/ButtonSubmit';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

const FormUpdateOrderSchema = z.object({
    status: z.string({ required_error: 'Vui lòng chọn cửa hàng!' }),
});

type IFormStatusSchema = z.infer<typeof FormUpdateOrderSchema>;

const FormOrder = ({ onCloseModal }: { onCloseModal: () => void }) => {
    const form = useForm<IFormStatusSchema>({ resolver: zodResolver(FormUpdateOrderSchema) });
    const onSubmit: SubmitHandler<IFormStatusSchema> = async (data) => {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
        try {
            console.log(data);
            onCloseModal();
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
                        name='status'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Trạng thái <span className='text-[#e41a0f]'>*</span>
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Cập nhật trạng thái' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='m@example.com'>Pending</SelectItem>
                                        <SelectItem value='m@google.com'>Confirmed</SelectItem>
                                        <SelectItem value='m@support.com'>Done</SelectItem>
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
