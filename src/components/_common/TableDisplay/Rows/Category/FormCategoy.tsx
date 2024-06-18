'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingButton from '~/components/elements/LoadingButton';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import useToastDisplay from '~/hooks/useToastDisplay';
import {
    useCreateCategoryMutation,
    useEditCategoryMutation,
    useGetDetailCategoryQuery,
} from '~/store/services/category.service';
import { CategoryErrorField, isCategoryError } from '~/types/Error/Helper/Store';

const FormCategory = ({ onCloseModal, id }: { onCloseModal: () => void; id?: number }) => {
    const [createCategory, createCategoryState] = useCreateCategoryMutation();
    const [updateCategory, updateCategoryState] = useEditCategoryMutation();
    const isFirstRender = useRef(true);
    const { data: detail } = useGetDetailCategoryQuery(id, { skip: !id });
    const toast = useToastDisplay();
    const detailCategory = detail?.data;
    const formSchema = z.object({
        name: z.string().min(3, {
            message: 'Name must be at least 3 characters.',
        }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    });
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            if (!id) {
                await createCategory(data);
            } else {
                await updateCategory({
                    name: data.name,
                    id,
                });
            }
        } catch (error) {
            console.error('Error message:', error);
        }
    };
    useEffect(() => {
        if (id && detailCategory) {
            form.reset({
                name: detailCategory.data.name,
            });
        }
    }, [detailCategory, form, id]);
    useEffect(() => {
        // if (!isFirstRender.current) {
        console.log('isFirstRender', isFirstRender.current);
        if (createCategoryState?.isError) {
            const { error } = createCategoryState;
            if (isCategoryError(error)) {
                const objectKey = Object.keys(error.data.error) as CategoryErrorField[];
                objectKey.forEach((key: CategoryErrorField) => {
                    const errorMessage = error.data.error[key].join(', ');
                    form.setError(key, { message: errorMessage });
                });
            } else {
                toast({ title: 'Có lỗi xảy ra', status: 'destructive' });
            }
        }
        if (updateCategoryState?.isError) {
            const { error } = updateCategoryState;
            if (isCategoryError(error)) {
                const objectKey = Object.keys(error.data.error) as CategoryErrorField[];
                objectKey.forEach((key: CategoryErrorField) => {
                    const errorMessage = error.data.error[key].join(', ');
                    form.setError(key, { message: errorMessage });
                });
            } else {
                toast({ title: 'Có lỗi xảy ra', status: 'destructive' });
            }
        }
        if (updateCategoryState.isSuccess || createCategoryState.isSuccess) {
            // if (id) {
            //     refetch();
            // }
            onCloseModal();
            toast({
                title: `${id ? 'Chỉnh sửa danh mục thành công!' : 'Thêm danh mục thành công!'} `,
                status: 'success',
            });
        }
        // } else {
        //     isFirstRender.current = false;
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createCategoryState, id, updateCategoryState]);

    return (
        <div className='m-auto pb-10'>
            <div className=' rounded-xl bg-card px-6 py-8'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='no-scrollbar max-h-[70vh] space-y-6 overflow-y-scroll'
                        encType='multipart/form-data'
                    >
                        <FormField
                            disabled={createCategoryState.isLoading || updateCategoryState.isLoading}
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name: </FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter your salon name' {...field} className='bg-card' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='w-[200px] hover:opacity-90'>
                            {!createCategoryState.isLoading && !updateCategoryState.isLoading && (
                                <>
                                    <Plus />
                                    {id ? 'Update' : 'Create'}
                                </>
                            )}
                            {createCategoryState.isLoading && (
                                <>
                                    <LoadingButton className='h-6 w-6' />
                                </>
                            )}
                            {updateCategoryState.isLoading && (
                                <>
                                    <LoadingButton className='h-6 w-6' />
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default FormCategory;
