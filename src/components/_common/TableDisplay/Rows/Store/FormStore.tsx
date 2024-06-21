'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingButton from '~/components/elements/LoadingButton';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useCreateStoreMutation, useGetDetailStoreQuery, useUpdateStoreMutation } from '~/store/services/store.service';
import { ErrorFields, isStoreError } from '~/types/Error/Helper/Store';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const FormOpening = ({ onCloseModal, id }: { onCloseModal: () => void; id?: number }) => {};
const FormStore = ({ onCloseModal, id }: { onCloseModal: () => void; id?: number }) => {
    const [isSaveImage, setIsSaveImage] = useState<boolean>(false);
    const formImageSchema = !isSaveImage
        ? z.undefined()
        : z
              .custom<FileList>((val) => val instanceof FileList, 'Required')
              .refine((files) => files?.length > 0, `Required`)
              .refine(
                  (files) => Array.from(files).every((file) => file?.size <= MAX_FILE_SIZE),
                  `Each file size should be less than 5 MB.`
              )
              .refine(
                  (files) => Array.from(files).every((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type)),
                  'Only these types are allowed .jpg, .jpeg, .png and .webp'
              );

    const formSchema = z.object({
        name: z.string().min(2, {
            message: 'Name must be at least 2 characters.',
        }),
        address: z.string().min(10, {
            message: 'Address must be at least 10 characters.',
        }),
        phone: z
            .string()
            .min(8, {
                message: 'Phone number must be at least 8 characters.',
            })
            .max(15, {
                message: 'Phone number must be less than 15 characters',
            }),

        image: id
            ? formImageSchema
            : z
                  .custom<FileList>((val) => val instanceof FileList, 'Required')
                  .refine((files) => files?.length > 0, `Required`)
                  .refine(
                      (files) => Array.from(files).every((file) => file?.size <= MAX_FILE_SIZE),
                      `Each file size should be less than 5 MB.`
                  )
                  .refine(
                      (files) => Array.from(files).every((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type)),
                      'Only these types are allowed .jpg, .jpeg, .png and .webp'
                  ),
    });

    const [preview, setPreview] = useState('');
    const [createStore, createStoreState] = useCreateStoreMutation();
    const [updateStore, updateStoreState] = useUpdateStoreMutation();
    const saveImageId = useId();
    const { data: detail, refetch } = useGetDetailStoreQuery(id, { skip: !id });
    const toast = useToastDisplay();
    const detailStore = detail?.data;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            address: '',
            phone: '',
            image: undefined,
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const formData = new FormData();
            const { name, address, phone } = data;
            if (!id) {
                formData.append('name', name);
                formData.append('address', address);
                formData.append('phone', phone);
                if (data?.image) {
                    const image = data.image?.[0];
                    formData.append('image', image);
                }
                createStore(formData);
            } else {
                formData.append('name', name);
                formData.append('address', address);
                formData.append('phone', phone);
                if (isSaveImage && data?.image) {
                    const image = data.image?.[0];
                    formData.append('image', image);
                }
                formData.append('_method', 'PUT');
                updateStore({
                    formdata: formData,
                    id,
                });
            }
        } catch (error) {
            console.error('Error message:', error);
        }
    };
    useEffect(() => {
        if (id && detailStore) {
            form.reset({
                name: detailStore.data.name,
                address: detailStore.data.address,
                phone: detailStore.data.phone,
            });
            setPreview(detailStore.data.image);
        }
        if (createStoreState?.isError) {
            const { error } = createStoreState;
            if (isStoreError(error)) {
                const objectKey = Object.keys(error.data.error) as ErrorFields[];
                objectKey.forEach((key: ErrorFields) => {
                    const errorMessage = error.data.error[key].join(', ');
                    form.setError(key, { message: errorMessage });
                });
            } else {
                toast({ title: 'Có lỗi xảy ra', status: 'destructive' });
            }
        }
        if (updateStoreState?.isError) {
            const { error } = updateStoreState;
            if (isStoreError(error)) {
                const objectKey = Object.keys(error.data.error) as ErrorFields[];
                objectKey.forEach((key: ErrorFields) => {
                    const errorMessage = error.data.error[key].join(', ');
                    form.setError(key, { message: errorMessage });
                });
            } else {
                toast({ title: 'Có lỗi xảy ra', status: 'destructive' });
            }
        }
        if (updateStoreState.isSuccess || createStoreState.isSuccess) {
            if (id) {
                refetch();
            }
            onCloseModal();
            toast({
                title: `${id ? 'Chỉnh sửa cửa hàng thành công!' : 'Thêm cửa hàng thành công!'} `,
                status: 'success',
            });
        }
    }, [createStoreState, id, detailStore, updateStoreState]);

    return (
        <div className='m-auto  pb-10'>
            <div className=' rounded-xl bg-background px-6 py-8'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='no-scrollbar max-h-[70vh] space-y-6 overflow-y-scroll'
                        encType='multipart/form-data'
                    >
                        <FormField
                            disabled={createStoreState.isLoading || updateStoreState.isLoading}
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
                        <FormField
                            control={form.control}
                            disabled={createStoreState.isLoading || updateStoreState.isLoading}
                            name='address'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address: </FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter your salon address' {...field} className='bg-card' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='phone'
                            disabled={createStoreState.isLoading || updateStoreState.isLoading}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone number: </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter your salon phone number'
                                            {...field}
                                            className='bg-card'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            disabled={createStoreState.isLoading || updateStoreState.isLoading}
                            name='image'
                            render={({ field: { onChange }, formState, fieldState, ...field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Image: </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={id ? !isSaveImage : false}
                                                className='cursor-pointer bg-card'
                                                type='file'
                                                accept='image/*'
                                                placeholder='Enter your salon logo'
                                                {...field}
                                                onChange={(event) => {
                                                    // desctructuring formState,fieldState because
                                                    // react they dont need in input props
                                                    if (event.target.files) {
                                                        const displayUrl = URL.createObjectURL(event.target.files![0]);
                                                        setPreview(displayUrl);
                                                        onChange(event.target.files);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        {id && (
                            <div className='flex items-center gap-2'>
                                <Checkbox
                                    id={saveImageId}
                                    defaultChecked
                                    onCheckedChange={() => setIsSaveImage(!isSaveImage)}
                                />
                                <label
                                    htmlFor={saveImageId}
                                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                >
                                    Giữ lại ảnh cũ
                                </label>
                            </div>
                        )}
                        {preview && <Image src={preview} className='rounded-xl' alt='image' width={100} height={100} />}
                        <Button type='submit' className='w-[200px] hover:opacity-90'>
                            {!createStoreState.isLoading && !updateStoreState.isLoading && (
                                <>
                                    <Plus />
                                    {id ? 'Update' : 'Create'}
                                </>
                            )}
                            {createStoreState.isLoading && (
                                <>
                                    <LoadingButton className='h-6 w-6' />
                                </>
                            )}
                            {updateStoreState.isLoading && (
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

export default FormStore;
