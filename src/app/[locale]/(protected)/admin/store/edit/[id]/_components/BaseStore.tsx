import React, { useEffect, useId, useState } from 'react';
import { IStore } from '~/types/Store';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import { Input } from '~/components/ui/input';
import Image from 'next/image';
import { Checkbox } from '~/components/ui/checkbox';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateStoreMutation } from '~/store/services/store.service';
import useToastDisplay from '~/hooks/useToastDisplay';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export default function BaseStore({ store, refetch }: { store: IStore; refetch: () => void }) {
    const [mutate, updateStoreState] = useUpdateStoreMutation();
    const toast = useToastDisplay();
    const [isSaveImage, setIsSaveImage] = useState<boolean>(true);
    const [isSaveActive, setSaveActive] = useState<boolean>(true);
    const [preview, setPreview] = useState<string>();
    const formSchema = z.object({
        name: z.string().min(2, {
            message: 'Name must be at last 2 characters.',
        }),
        address: z.string().min(10, {
            message: 'Address must be at last 10 characters.',
        }),
        phone: z
            .string()
            .min(8, {
                message: 'Phone number must be at last 8 characters.',
            })
            .max(15, {
                message: 'Phone number must be less than 15 characters',
            }),

        image: !isSaveImage
            ? z
                  .custom<FileList>((val) => val instanceof FileList, 'Required')
                  .refine((files) => files?.length > 0, `Required`)
                  .refine(
                      (files) => Array.from(files).every((file) => file?.size <= MAX_FILE_SIZE),
                      `Each file size should be less than 5 MB.`
                  )
                  .refine(
                      (files) => Array.from(files).every((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type)),
                      'Only these types are allowed .jpg, .jpeg, .png and .webp'
                  )
            : z.any(),
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            address: '',
            phone: '',
            image: undefined,
        },
    });
    const saveImageId = useId();
    const handleOnsubmit = (data: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        const { name, address, phone } = data;
        formData.append('name', name);
        formData.append('address', address);
        formData.append('phone', phone);
        formData.append('latitude', '0');
        formData.append('longitude', '0');
        if (!isSaveImage) {
            const image = data.image?.[0];
            formData.append('image', image);
        }
        formData.append('_method', 'PUT');
        mutate({ formdata: formData, id: store ? store?.id : 0 });
        console.log(data);
    };
    const watchFields = form.watch(['name', 'address', 'phone', 'image']);
    useEffect(() => {
        form.reset({
            name: store?.name,
            address: store?.address,
            phone: store?.phone,
        });
        setPreview(store?.image);
    }, [store]);
    useEffect(() => {
        if (isSaveImage) {
            setPreview(store?.image);
            form.setValue('image', undefined);
        }
    }, [isSaveImage]);
    useEffect(() => {
        if (updateStoreState.isSuccess) {
            refetch();
            toast({ title: 'Cập nhật cửa hàng thành công!', status: 'success' });
        }
    }, [updateStoreState]);
    useEffect(() => {
        if (
            watchFields[0] !== store?.name ||
            watchFields[1] !== store.address ||
            watchFields[2] !== store.phone ||
            watchFields[3] !== undefined
        ) {
            setSaveActive(false);
        } else {
            setSaveActive(true);
        }
    }, [watchFields]);
    return (
        <div>
            <div className='px-6'>
                <h3 className='text-xl'>Chỉnh sửa thông tin cơ bản</h3>
                <div className='mt-4 '>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleOnsubmit)}
                            className=' w-[60%]  space-y-4'
                            encType='multipart/form-data'
                        >
                            <div className='flex  gap-10'>
                                {preview && (
                                    <Image
                                        src={preview}
                                        className='h-[120px] w-[150px] rounded-xl'
                                        alt='image'
                                        width={150}
                                        height={120}
                                    />
                                )}
                                <div className='flex flex-col justify-between pt-5'>
                                    <div className='flex items-center gap-2 '>
                                        <Checkbox
                                            id={saveImageId}
                                            defaultChecked
                                            onCheckedChange={() => setIsSaveImage(!isSaveImage)}
                                        />
                                        <label
                                            htmlFor={saveImageId}
                                            className='cursor-pointer select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            Giữ lại ảnh cũ
                                        </label>
                                    </div>
                                    {!isSaveImage && (
                                        <FormField
                                            control={form.control}
                                            name='image'
                                            render={({ field: { onChange }, formState, fieldState, ...field }) => {
                                                return (
                                                    <FormItem>
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
                                                                        const displayUrl = URL.createObjectURL(
                                                                            event.target.files![0]
                                                                        );
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
                                    )}
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name: </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter your salon name'
                                                {...field}
                                                className='border-default bg-content'
                                            />
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
                                            <Input
                                                placeholder='Enter your salon address'
                                                {...field}
                                                className='border-default bg-content'
                                            />
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
                                                className='border-default bg-content'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* <FormField
                                control={form.control}
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
                                                            const displayUrl = URL.createObjectURL(
                                                                event.target.files![0]
                                                            );
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
                            /> */}

                            <Button disabled={isSaveActive} type='submit' className='w-[200px] hover:opacity-90'>
                                <Plus />
                                Save
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
