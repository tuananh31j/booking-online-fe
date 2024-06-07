'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { log } from 'console';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useCreateStoreMutation } from '~/store/services/store.service';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
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
const CreateStore = () => {
    const [preview, setPreview] = useState('');
    const [createStore] = useCreateStoreMutation();

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
            console.log(data);
            const formData = new FormData();
            const image = data.image?.[0];
            formData.append('name', data.name);
            formData.append('address', data.address);
            formData.append('phone', data.phone);
            formData.append('image', image);

            // eslint-disable-next-line
            const res = await createStore(formData);
            // console.log(res);
        } catch (error) {
            console.error('Error message:', error);
        }
    };
    return (
        <div className='m-auto w-[40vw]  pb-10'>
            {' '}
            <div className='rounded-xl bg-card px-6 py-8'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8' encType='multipart/form-data'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name: </FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter your salon name' {...field} className='bg-white' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='address'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address: </FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter your salon address' {...field} className='bg-white' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='phone'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone number: </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter your salon phone number'
                                            {...field}
                                            className='bg-white'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='image'
                            render={({ field: { onChange }, formState, fieldState, ...field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Image: </FormLabel>
                                        <FormControl>
                                            <Input
                                                className='cursor-pointer bg-white'
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
                        <Button type='submit' className='hover:opacity-90'>
                            <Plus />
                            Create
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CreateStore;
