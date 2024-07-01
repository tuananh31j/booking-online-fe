'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingButton from '~/components/elements/LoadingButton';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useCreateStoreMutation } from '~/store/services/store.service';
import { ErrorFields, isMessageError, isStoreError } from '~/types/Error/Helper/Store';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const FormStore = ({ onCloseModal, id }: { onCloseModal: () => void; id?: number }) => {
    const t = useTranslations('Table.Store');

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

        image: z
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
    const toast = useToastDisplay();
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
            formData.append('name', name);
            formData.append('address', address);
            formData.append('phone', phone);
            if (data?.image) {
                const image = data.image?.[0];
                formData.append('image', image);
            }
            createStore(formData);
        } catch (error) {
            console.error('Error message:', error);
        }
    };
    useEffect(() => {
        if (createStoreState?.isError) {
            const { error } = createStoreState;
            if (isStoreError(error)) {
                const objectKey = Object.keys(error.data.error) as ErrorFields[];
                objectKey.forEach((key: ErrorFields) => {
                    const errorMessage = error.data.error[key].join(', ');
                    form.setError(key, { message: errorMessage });
                });
            }
            if (isMessageError(error)) {
                toast({ title: `${error.data.message}`, status: 'destructive' });
            }
        }

        if (createStoreState.isSuccess) {
            onCloseModal();
            toast({
                title: t('add.success'),
                status: 'success',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createStoreState]);

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
                            disabled={createStoreState.isLoading}
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
                            disabled={createStoreState.isLoading}
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
                            disabled={createStoreState.isLoading}
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
                            disabled={createStoreState.isLoading}
                            name='image'
                            render={({ field: { onChange }, formState, fieldState, ...field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Image: </FormLabel>
                                        <FormControl>
                                            <Input
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

                        {preview && <Image src={preview} className='rounded-xl' alt='image' width={100} height={100} />}
                        <Button type='submit' className='w-[200px] hover:opacity-90'>
                            <Plus />
                            Create
                            {createStoreState.isLoading && (
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
