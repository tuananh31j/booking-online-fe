'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import FormItemDisplay from '~/components/_common/FormItemDisplay';
import ButtonSubmit from '~/components/_common/ButtonSubmit';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import {
    useCreateServiceMutation,
    useGetDetailServiceQuery,
    useGetListServiceQuery,
    useUpdateServiceMutation,
} from '~/store/services/service.service';
import { useGetListCategoryQuery } from '~/store/services/category.service';
import { useEffect, useState } from 'react';
import useToastDisplay from '~/hooks/useToastDisplay';
import { title } from 'process';
import { replace, set } from 'lodash';
import { useTranslations } from 'next-intl';

const FormServiceSchema = z.object({
    name: z.string({ required_error: 'Họ và tên không được để trống!' }),
    categorie_id: z.string({ required_error: 'Danh mục không được để tr' }),
    describe: z.string({ required_error: 'Số điện thoại không được để trống!' }),
    price: z.string({ required_error: 'Vui lòng nhập giá cả!', invalid_type_error: 'Giá trị không đúng!' }),
    time: z.string({ required_error: 'Vui lòng nhập thời gian!', invalid_type_error: 'Thời gian không đúng!' }),
});

type IFormService = z.infer<typeof FormServiceSchema>;

const FormService = ({ onCloseModal, id }: { onCloseModal: () => void; id: number }) => {
    const t = useTranslations('Table.Service');

    const { data: categoryData, isLoading: isCategoryLoading } = useGetListCategoryQuery();
    const { data: service, refetch, isLoading } = useGetDetailServiceQuery(id, { skip: !id });
    const [createService, createServiceState] = useCreateServiceMutation();
    const [updateService, updateServiceSate] = useUpdateServiceMutation();
    const { data: serviceList } = useGetListServiceQuery();
    const form = useForm<IFormService>({ resolver: zodResolver(FormServiceSchema) });
    const [categoryId, setCategoryId] = useState('');
    const toast = useToastDisplay();

    const [errorMessageName, seterrorMessageName] = useState('');

    const onSubmit: SubmitHandler<IFormService> = async (data) => {
        seterrorMessageName('');

        if (!id) {
            if (serviceList?.data.data.find((item) => item.name === data.name)) {
                seterrorMessageName('Tên dịch vụ đã tồn tại');
                return;
            }
        }
        await new Promise((resolve) => {
            resolve(data);
        });

        if (!id) {
            try {
                createService({
                    name: data.name,
                    categorie_id: Number(data.categorie_id), // Chuyển đổi category thành số
                    price: data.price,
                    describe: data.describe,
                    time: Number(data.time),
                }).unwrap();
                toast({ title: t('add.success'), status: 'success' });
                onCloseModal();
            } catch (error) {
                console.log(error);
                onCloseModal();
                toast({ title: t('add.fail'), status: 'destructive' });
            }
        } else {
            try {
                console.log(data);
                updateService({
                    id,
                    formData: {
                        name: data.name,
                        categorie_id: Number(data.categorie_id), // Chuyển đổi category thành số
                        price: data.price,
                        describe: data.describe,
                        time: Number(data.time),
                    },
                });
                onCloseModal();
                toast({ title: t('edit.success'), status: 'success' });
            } catch (error) {
                console.log(error);
                onCloseModal();
                toast({ title: t('edit.fail'), status: 'destructive' });
            }
        }
    };

    useEffect(() => {
        if (id) {
            form.reset({
                name: service?.data.data.name,
                price: replace(service?.data.data.price ?? '', /\.00$/, ''), // Sử dụng toán tử ?? để cung cấp giá trị mặc định '' khi service?.data.data.price là undefined
                categorie_id: service?.data.data.categorie_id.toString(),
                describe: service?.data.data.describe,
                time: service?.data.data.time.toString() || '0',
            });
        }
    }, [createServiceState, form, id, service, updateServiceSate]);
    return (
        <div className='mx-auto flex flex-col justify-center'>
            {!isLoading && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField
                            control={form.control}
                            name='categorie_id'
                            render={({ field }) => {
                                return (
                                    <FormItem className='w-full'>
                                        <FormLabel>
                                            Danh mục <span className=' text-[#e41a0f]'>*</span>
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={service?.data.data.categorie_id.toString()}
                                        >
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
                                );
                            }}
                        />
                        <div className='grid grid-cols-2 gap-3'>
                            <div className='flex flex-col items-center'>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => {
                                        return (
                                            <>
                                                <FormItemDisplay
                                                    title='Tên dịch vụ'
                                                    placeholder='Nhập tên dịch vụ!'
                                                    {...field}
                                                    require
                                                    type='text'
                                                />
                                                <FormMessage>{errorMessageName}</FormMessage>
                                            </>
                                        );
                                    }}
                                />

                                <FormField
                                    control={form.control}
                                    name='time'
                                    render={({ field }) => {
                                        return (
                                            <>
                                                <FormItemDisplay
                                                    title='Thời gian dịch vụ'
                                                    placeholder='Nhập thời gian dịch vụ!'
                                                    {...field}
                                                    require
                                                    type='number'
                                                />
                                            </>
                                        );
                                    }}
                                />
                            </div>
                            <div className='flex flex-col items-center'>
                                <FormField
                                    control={form.control}
                                    name='describe'
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

                            <div className='col-span-2'>
                                <button className='mt-3 flex h-14 w-full flex-col items-center justify-center rounded-md border-transparent bg-card p-3 text-foreground'>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};

export default FormService;
