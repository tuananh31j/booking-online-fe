'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import FormItemDisplay from '~/components/_common/FormItemDisplay';
import ButtonSubmit from '~/components/_common/ButtonSubmit';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { useGetListCategoryQuery } from '~/store/services/category.service';
import { IServiceItem } from '~/types/service';
import { useUpdateServiceMutation } from '~/store/services/service.service';

const FormUpdateServiceSchema = z.object({
    name: z.string({ required_error: 'Họ và tên không được để trống!' }),
    category: z.string({ required_error: 'Số điện thoại không được để trống!' }),
    description: z.string({ required_error: 'Số điện thoại không được để trống!' }),
    price: z.string({ required_error: 'Vui lòng nhập giá cả!', invalid_type_error: 'Giá trị không đúng!' }),
    // .positive({ message: 'Giá phải là số dương!' })
    // .min(1000, { message: 'Giá không được nhỏ hơn 1000!' }),
});

type IFormUpdateService = z.infer<typeof FormUpdateServiceSchema>;

const FormUpdateService = ({ service, onCloseModal }: { service: IServiceItem; onCloseModal: () => void }) => {
    const { data: categoryData, isLoading: isCategoryLoading } = useGetListCategoryQuery();
    const form = useForm<IFormUpdateService>({
        resolver: zodResolver(FormUpdateServiceSchema),
        defaultValues: {
            // Giá trị mặc định từ dữ liệu dịch vụ hiện tại
            name: service.name,
            category: service.categorie_id.toString(),
            description: service.describe,
            price: service.price,
        },
    });
    const [updateService, { isLoading }] = useUpdateServiceMutation();
    const onSubmit: SubmitHandler<IFormUpdateService> = async (data) => {
        try {
            const result = await updateService({
                id: service.id,
                formData: {
                    name: data.name,
                    categorie_id: Number(data.category),
                    price: data.price,
                    describe: data.description,
                },
            }).unwrap();
            onCloseModal();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='mx-auto flex w-[30vw] flex-col justify-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <div className='flex justify-between'>
                        <div>
                            <FormField
                                control={form.control}
                                name='category'
                                render={({ field }) => (
                                    <FormItem className='my-3 flex flex-col gap-2'>
                                        <FormLabel>
                                            Danh mục <span className='text-[#e41a0f]'>*</span>
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Chọn danh mục' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {!isCategoryLoading &&
                                                    categoryData?.data.data.map((category) => (
                                                        <SelectItem key={category.id} value={category.id.toString()}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>{''}</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItemDisplay
                                        title='Tên dịch vụ'
                                        placeholder='Nhập tên dịch vụ!'
                                        {...field}
                                        require
                                        type='text'
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItemDisplay
                                        title='Mô tả'
                                        placeholder='Nhập mô tả dịch vụ!'
                                        {...field}
                                        require
                                        type='text'
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='price'
                                render={({ field }) => (
                                    <FormItemDisplay
                                        title='Giá'
                                        placeholder='Nhập giá dịch vụ!'
                                        {...field}
                                        require
                                        type='number'
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <ButtonSubmit isSubmitting={form.formState.isSubmitting} name='Submit' />
                </form>
            </Form>
        </div>
    );
};

export default FormUpdateService;
