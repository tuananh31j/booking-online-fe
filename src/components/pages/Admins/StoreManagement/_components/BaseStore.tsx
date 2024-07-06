import React, { useEffect, useId, useState } from 'react';
import { IStore } from '~/types/Store';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { HelpCircle, Plus } from 'lucide-react';
import { Input } from '~/components/ui/input';
import Image from 'next/image';
import { Checkbox } from '~/components/ui/checkbox';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateStoreMutation } from '~/store/services/store.service';
import useToastDisplay from '~/hooks/useToastDisplay';
import { ErrorFields, isMessageError, isStoreError } from '~/types/Error/Helper/Store';
import PopupLocationStep from '~/components/_common/PopupLocationStep/PopupLocationStep';

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
        location: z.string().nullable().optional(),
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
            location: '',
            image: undefined,
        },
    });
    const saveImageId = useId();
    const handleOnsubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const formData = new FormData();
            const { name, address, phone } = data;
            formData.append('name', name);
            formData.append('address', address);
            formData.append('phone', phone);
            if (!isSaveImage) {
                const image = data.image?.[0];
                formData.append('image', image);
            }
            if (data.location) {
                formData.append('location', data.location);
            }
            formData.append('_method', 'PUT');
            const res = await mutate({ formdata: formData, id: store ? store?.id : 0 }).unwrap();
            toast({ title: `${res.message}`, status: 'success' });
            refetch();
        } catch (error) {
            if (isStoreError(error)) {
                const objectKey = Object.keys(error.data.error) as ErrorFields[];
                objectKey.forEach((key) => {
                    const messageJoined = error.data.error[key].join(', ');
                    form.setError(key, { message: messageJoined });
                });
            }
            if (isMessageError(error)) {
                toast({ title: `${error.data.message}`, status: 'destructive' });
            }
        }
    };
    const watchFields = form.watch(['name', 'address', 'phone', 'image', 'location']);
    const [htmlContent, sethtml] = useState('');
    useEffect(() => {
        if (store) {
            form.reset({
                name: store?.name,
                address: store?.address,
                phone: store?.phone,
                location: store.location,
            });
        }
        setPreview(store?.image);
        if (store.location) {
            sethtml(store.location);
        }
    }, [store]);
    useEffect(() => {
        if (isSaveImage) {
            setPreview(store?.image);
            form.setValue('image', undefined);
        }
    }, [isSaveImage]);

    useEffect(() => {
        if (
            watchFields[0] !== store?.name ||
            watchFields[1] !== store.address ||
            watchFields[2] !== store.phone ||
            watchFields[3] !== undefined ||
            watchFields[4] !== store.location
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
                            className=' w-[80%]  space-y-4'
                            encType='multipart/form-data'
                        >
                            <div className='flex gap-10'>
                                <div className='w-[30%] shrink-0'>
                                    <div className='flex  flex-wrap gap-10'>
                                        {preview && (
                                            <Image
                                                src={preview}
                                                className='h-[120px] w-[150px] rounded-xl'
                                                alt='image'
                                                width={150}
                                                height={120}
                                            />
                                        )}
                                        <div className='flex w-[80%] flex-col justify-between pt-5'>
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
                                                    render={({
                                                        field: { onChange },
                                                        formState,
                                                        fieldState,
                                                        ...field
                                                    }) => {
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
                                    <Button
                                        disabled={isSaveActive}
                                        type='submit'
                                        className='mt-4 w-[200px] hover:opacity-90'
                                    >
                                        <Plus />
                                        Save
                                    </Button>
                                </div>
                                <div>
                                    {htmlContent && <div dangerouslySetInnerHTML={{ __html: htmlContent }} />}
                                    <FormField
                                        control={form.control}
                                        name='location'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='flex items-center gap-3'>
                                                    <span>Location</span>
                                                    <PopupLocationStep>
                                                        <HelpCircle className='cursor-pointer' />
                                                    </PopupLocationStep>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Enter your location store'
                                                        {...field}
                                                        className='border-default bg-content'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
