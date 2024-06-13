'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, SaveIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useId, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormItemDisplay from '~/components/_common/FormItemDisplay';
import LoadingButton from '~/components/elements/LoadingButton';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Form, FormField } from '~/components/ui/form';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useCreateStaffMutation, useEditStaffMutation, useGetStaffDetailQuery } from '~/store/services/staff.service';
import { ErrorStaffFields, isStaffError } from '~/types/Error/Helper/Store';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const FormStaff = ({ onCloseModal, id }: { onCloseModal: () => void; id: number }) => {
    const [isSaveImage, setIsSaveImage] = useState<boolean>(true);

    const toast = useToastDisplay();
    const [createStaff, createStaffState] = useCreateStaffMutation();
    const [updateStaff, updateStaffState] = useEditStaffMutation();
    const { data: detail, refetch } = useGetStaffDetailQuery(id, { skip: !id });

    const detailStaff = detail?.data?.data;
    const saveImageId = useId();
    const [preview, setPreview] = useState('');

    const imageSchema = isSaveImage
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
    const FormStaffSchema = z.object({
        // shop: z.string({ required_error: 'Cửa hàng không được để trống!' }),
        email: z.string().email('Email không hợp lệ!'),
        name: z
            .string({ required_error: 'Họ và tên không được để trống!' })
            .min(3, { message: 'Họ và tên ít nhất phải có 2 ký tự !' }),
        phone: z
            .string({ required_error: 'Số điện thoại không được để trống!' })
            .min(3, { message: 'Số điện thoại ít nhất phải có 9 ký tự !' }),
        password: z.any(),
        address: z
            .string({ required_error: 'Địa chỉ không được để trống!' })
            .min(3, { message: 'Số điện thoại ít nhất phải có 10 ký tự !' }),
        image: !id
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
            : imageSchema,
    });

    type IFormStaff = z.infer<typeof FormStaffSchema>;

    const form = useForm<IFormStaff>({
        resolver: zodResolver(FormStaffSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            image: undefined,
        },
    });
    const onSubmit: SubmitHandler<IFormStaff> = async (data) => {
        // await new Promise((resolve) => {
        //     setTimeout(resolve, 1000);
        // }).then(() => {});
        try {
            console.log(data);
            const formData = new FormData();
            const { name, address, phone, password, email } = data;
            const image = data.image?.[0];
            if (!id) {
                formData.append('name', name);
                formData.append('address', address);
                formData.append('email', email);
                formData.append('phone', phone);
                formData.append('image', image);
                formData.append('password', password);
                createStaff(formData);
            } else {
                formData.append('name', name);
                formData.append('address', address);
                formData.append('email', email);
                formData.append('phone', phone);
                formData.append('password', password);
                formData.append('_method', 'PUT');

                if (!isSaveImage) {
                    formData.append('image', image);
                }
                updateStaff({
                    formdata: formData,
                    id,
                });
            }
            // onCloseModal();
        } catch (error) {
            console.log('Message: ', error);
        }
    };

    useEffect(() => {
        if (id && detailStaff !== undefined && Object.values(detailStaff).length > 0) {
            form.reset({
                name: detailStaff.name,
                email: detailStaff.email,
                address: detailStaff?.address || '',
                phone: detailStaff?.phone || '',
            });
            setPreview(detailStaff?.image || '');
        }
        if (createStaffState.isSuccess || updateStaffState.isSuccess) {
            toast({
                title: `${!id ? 'Thêm mới nhân viên thành công!' : 'Chỉnh sửa nhân viên thành công!'}`,
                status: 'success',
            });
            if (id) {
                refetch();
            }
            onCloseModal();
            if (updateStaffState.isError) {
                const { error } = updateStaffState;
                if (isStaffError(error)) {
                    const objectKey = Object.keys(error.data.error) as ErrorStaffFields[];
                    objectKey.forEach((key) => {
                        const errorMessage = error.data.error[key].join(', ');
                        form.setError(key, { message: errorMessage });
                    });
                }
            }
        }
    }, [createStaffState, id, detailStaff, updateStaffState]);
    return (
        <div className='mx-auto flex flex-col justify-center overflow-y-auto px-4 py-6 sm:h-[80vh] xl:pt-0 2xl:h-[unset] '>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='pt-[70%] 2xl:pt-0'>
                    {/* {!id && (
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
                    )} */}
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItemDisplay
                                title='Họ và tên'
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
                        name='password'
                        render={({ field }) => (
                            <FormItemDisplay
                                title='Password'
                                placeholder='Nhập password nhân viên!'
                                {...field}
                                require
                                type='text'
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
                    <FormField
                        control={form.control}
                        name='image'
                        disabled={id ? isSaveImage : false}
                        render={({ field: { onChange }, formState, fieldState, ...passField }) => (
                            <FormItemDisplay
                                title='Image:'
                                {...passField}
                                require
                                disabled={id ? isSaveImage : false}
                                type='file'
                                onChange={(event) => {
                                    const inputElement = event.target as HTMLInputElement;
                                    if (inputElement.files) {
                                        const displayUrl = URL.createObjectURL(inputElement.files[0]);
                                        setPreview(displayUrl);
                                        onChange(inputElement.files);
                                    }
                                }}
                            />
                        )}
                    />
                    {id && (
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
                    )}
                    {preview && (
                        <Image
                            src={preview}
                            className='my-3 h-24 w-24 rounded-xl object-cover'
                            alt='image'
                            width={100}
                            height={100}
                        />
                    )}
                    <Button type='submit' className='w-52 hover:opacity-90'>
                        {!createStaffState.isLoading && !updateStaffState.isLoading && (
                            <>
                                <Plus />
                                {id ? 'Update' : 'Create'}
                            </>
                        )}
                        {createStaffState.isLoading && (
                            <>
                                <LoadingButton className='h-6 w-6' />
                            </>
                        )}
                        {updateStaffState.isLoading && (
                            <>
                                <LoadingButton className='h-6 w-6' />
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default FormStaff;
