'use client';

//  Đạt làm nốt phần form nhé
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import FormItemDisplay from '~/components/_common/FormItemDisplay';
import ButtonSubmit from '~/components/_common/ButtonSubmit';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

const FormStaffSchema = z.object({
    email: z.string({ required_error: 'Email không được để trống!' }).email('Email không hợp lệ!'),
    fullName: z.string({ required_error: 'Họ và tên không được để trống!' }),
    phone: z.string({ required_error: 'Số điện thoại không được để trống!' }),
    shop: z.string({ required_error: 'Vui lòng chọn cửa hàng!' }),
});

type IFormStaff = z.infer<typeof FormStaffSchema>;

const FormStore = ({ onCloseModal }: { onCloseModal: () => void }) => {
    const form = useForm<IFormStaff>({ resolver: zodResolver(FormStaffSchema) });
    const onSubmit: SubmitHandler<IFormStaff> = async (data) => {
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
        <div className='mx-auto flex w-[90%] flex-col justify-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name='shop'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Cửa hàng <span className='text-[#e41a0f]'>*</span>
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Chọn địa chỉ cửa hàng' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='m@example.com'>Hà Đông</SelectItem>
                                        <SelectItem value='m@google.com'>Chương Mỹ</SelectItem>
                                        <SelectItem value='m@support.com'>Quốc Oai</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='fullName'
                        render={({ field }) => (
                            <FormItemDisplay
                                title='Tên cửa hàng'
                                placeholder='Nhập tên nhân viên!'
                                {...field}
                                require
                                type='text'
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItemDisplay
                                title='Email'
                                placeholder='Nhập email nhân viên!'
                                {...field}
                                require
                                type='email'
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='phone'
                        render={({ field }) => (
                            <FormItemDisplay
                                title='Số điện thoại'
                                placeholder='Nhập số điện thoại!'
                                {...field}
                                require
                                type='text'
                            />
                        )}
                    />
                    <ButtonSubmit isSubmitting={form.formState.isSubmitting} name='Submit' />
                </form>
            </Form>
        </div>
    );
};

export default FormStore;
