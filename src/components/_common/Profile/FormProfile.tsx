'use client';

import React, { useEffect, useRef, useState } from 'react';
import { IUserResponse } from '~/types/User';
import { never, z } from 'zod';
// import { Form, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '~/components/ui/form';

import FormItemDisplay from '~/components/_common/FormItemDisplay';
import { Avatar, AvatarImage, Image } from '@radix-ui/react-avatar';
import { Button } from '~/components/ui/button';
import clsx from 'clsx';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { Check, X } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateUserProfileMutation } from '~/store/services/user.service';
import { useToast } from '~/components/ui/use-toast';
import { title } from 'process';
import useToastDisplay from '~/hooks/useToastDisplay';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export default function FormProfile({
    onCloseModal,
    userData,
    refetch,
}: {
    onCloseModal: () => void;
    userData: IUserResponse;
    refetch: () => void;
}) {
    const toast = useToastDisplay();
    const [previewImage, setPreviewImage] = useState(userData.image);
    const [updateProfile, updateProfileState] = useUpdateUserProfileMutation();

    const imageSchema =
        previewImage === userData.image
            ? z.any()
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

    const FormProfileSchema = z.object({
        // email: z.string().email('Email không hợp lệ!'),
        name: z
            .string({ required_error: 'Họ và tên không được để trống!' })
            .min(3, { message: 'Họ và tên ít nhất phải có 2 ký tự !' }),
        phone: z
            .string({ required_error: 'Số điện thoại không được để trống!' })
            .min(3, { message: 'Số điện thoại ít nhất phải có 9 ký tự !' }),
        address: z
            .string({ required_error: 'Địa chỉ không được để trống!' })
            .min(3, { message: 'Địa chỉ ít nhất phải có 10 ký tự !' }),
        current_password: z
            .string({ required_error: 'Vui lòng nhập mật khẩu' })
            .min(6, { message: 'Password phải có ít nhất 6 ký tự!' }),
        new_password: z.any(),
        image: imageSchema,
    });

    type IFormProfile = z.infer<typeof FormProfileSchema>;

    const form = useForm<IFormProfile>({
        resolver: zodResolver(FormProfileSchema),
        defaultValues: {
            name: userData.name,
            // email: userData.email,
            phone: userData.phone,
            address: userData.address,
            image: undefined,
            current_password: '12345678',
        },
    });

    const onSubmit: SubmitHandler<IFormProfile> = async (data) => {
        const formData = new FormData();

        if (!data.image) delete data.image;

        const image = data.image?.[0];

        formData.append('name', data.name);
        formData.append('address', data.address);
        formData.append('phone', data.phone);
        formData.append('image', image);
        formData.append('current_password', data.current_password);
        formData.append('new_password', data.new_password);

        updateProfile(formData);
    };

    useEffect(() => {
        if (updateProfileState.isSuccess) {
            toast({ title: 'Update profile thành công!', status: 'success' });
            onCloseModal();
            refetch();
        }

        if (updateProfileState.isError) {
            console.log(updateProfileState);
            toast({ title: "updateProfileState.error.data.message.join(' - ')", status: 'destructive' });
        }
    }, [updateProfileState]);

    const inputRef = useRef(null);

    return (
        <div className='mx-auto flex flex-col justify-center overflow-y-auto px-4 py-6 sm:h-[80vh] xl:pt-0 2xl:h-[unset] '>
            <Form {...form}>
                <form className='pt-2 2xl:pt-0' onSubmit={form.handleSubmit(onSubmit)}>
                    <Avatar className='relative mx-auto mb-14 block h-fit w-fit rounded-full border-4 border-violet-500 object-cover shadow-lg'>
                        <div className='absolute bottom-24 w-full '>
                            <div
                                className={clsx('edit flex w-full justify-end ', {
                                    hidden: userData.image !== previewImage,
                                })}
                            >
                                <Pencil1Icon
                                    className=' h-6 w-6 rounded-full bg-slate-300 p-1 hover:cursor-pointer'
                                    onClick={() => {
                                        if (inputRef.current !== null && typeof inputRef.current === 'object') {
                                            (inputRef.current as HTMLElement).click();
                                        } else {
                                            console.error('error open input image window!');
                                        }
                                    }}
                                />
                            </div>
                            <div
                                className={clsx('confirm-change flex w-full justify-end', {
                                    hidden: userData.image === previewImage,
                                })}
                            >
                                <X
                                    onClick={() => {
                                        setPreviewImage(userData.image);
                                        form.resetField('image');
                                    }}
                                    className='h-6 w-6 rounded-full bg-red-500 p-1 text-white hover:cursor-pointer'
                                />
                                {/* <Check className='h-6 w-6 rounded-full bg-green-500 p-1 text-white hover:cursor-pointer' /> */}
                            </div>
                        </div>
                        <AvatarImage className='h-32 w-32 rounded-full' src={previewImage} />
                    </Avatar>

                    <div className='hidden'>
                        <FormField
                            control={form.control}
                            name='image'
                            render={({ field: { onChange }, formState, fieldState, ...passField }) => (
                                <FormItemDisplay
                                    ref={inputRef}
                                    title='Image:'
                                    {...passField}
                                    type='file'
                                    onChange={(event) => {
                                        const inputElement = event.target as HTMLInputElement;
                                        if (inputElement.files) {
                                            try {
                                                const displayUrl = URL.createObjectURL(inputElement.files[0]);
                                                setPreviewImage(displayUrl);
                                                onChange(inputElement.files);
                                            } catch (error) {
                                                console.error('Unknown Error, can not choose new image!');
                                            }
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItemDisplay
                                title='Họ và tên'
                                placeholder='Nhập họ và tên!'
                                {...field}
                                require
                                type='text'
                            />
                        )}
                    />
                    {/* <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItemDisplay
                                title='Email'
                                placeholder='Nhập địa chỉ email!'
                                {...field}
                                require
                                type='email'
                            />
                        )}
                    /> */}
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
                    <FormField
                        control={form.control}
                        name='address'
                        render={({ field }) => (
                            <FormItemDisplay
                                title='Địa chỉ'
                                placeholder='Nhập địa chỉ nơi ở!'
                                {...field}
                                require
                                type='text'
                            />
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='current_password'
                        render={({ field }) => (
                            <FormItemDisplay
                                title='Mật khẩu hiện tại'
                                placeholder='Nhập mật khẩu hiện tại!'
                                {...field}
                                require
                                type='text'
                            />
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='new_password'
                        render={({ field }) => (
                            <FormItemDisplay
                                title='Mật khẩu mới '
                                placeholder='Nhập mật khẩu mới (bỏ trống nếu không cần thay đổi)'
                                {...field}
                                type='text'
                            />
                        )}
                    />

                    <div className='flex flex-wrap items-center justify-between'>
                        <Button
                            type='submit'
                            // onClick={() => onSubmit(form.getValues())}
                            className='w-52 hover:opacity-90'
                        >
                            Submit
                        </Button>

                        <Button type='button' className='w-52 bg-slate-400 hover:opacity-90' onClick={onCloseModal}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
