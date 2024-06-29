'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useId, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormItemDisplay from '~/components/_common/FormItemDisplay';
import LoadingButton from '~/components/elements/LoadingButton';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useCreateStaffMutation, useEditStaffMutation, useGetStaffDetailQuery } from '~/store/services/staff.service';
import { useGetListStoreQuery } from '~/store/services/store.service';
import { ErrorStaffFields, isStaffError } from '~/types/Error/Helper/Store';
import { Input } from '~/components/ui/input';
import { useTranslations } from 'next-intl';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const FormStaff = ({ onCloseModal, id }: { onCloseModal: () => void; id: number }) => {
    const t = useTranslations('Table.Staff');

    const [isSaveImage, setIsSaveImage] = useState<boolean>(true);

    const toast = useToastDisplay();
    const { data: storeData } = useGetListStoreQuery();
    const stores = storeData?.data?.data;

    const [createStaff, createStaffState] = useCreateStaffMutation();
    const [updateStaff, updateStaffState] = useEditStaffMutation();

    const { data: detail, refetch } = useGetStaffDetailQuery(id, { skip: !id });
    const detailStaff = detail?.data?.data;

    const saveImageId = useId();
    const imageId = useId();

    const [preview, setPreview] = useState('');

    const imageSchema = isSaveImage
        ? z.any()
        : z
              .custom<FileList>((val) => val instanceof FileList, 'Required image')
              .refine((files) => files?.length >= 1, `Required image`)
              .refine(
                  (files) => Array.from(files).every((file) => file?.size <= MAX_FILE_SIZE),
                  `Each file size should be less than 5 MB.`
              )
              .refine(
                  (files) => Array.from(files).every((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type)),
                  'Only these types are allowed .jpg, .jpeg, .png and .webp'
              );
    const FormStaffSchema = z.object({
        store_id: z
            .string({ required_error: 'Cửa hàng không được để trống!' })
            .min(1, { message: 'Cửa hàng không được để trống!' }),
        email: z.string().email('Email không hợp lệ!'),
        name: z
            .string({ required_error: 'Họ và tên không được để trống!' })
            .min(3, { message: 'Họ và tên ít nhất phải có 2 ký tự !' }),
        phone: z
            .string({ required_error: 'Số điện thoại không được để trống!' })
            .min(3, { message: 'Số điện thoại ít nhất phải có 9 ký tự !' }),
        password: z.string().min(6, { message: 'Password phải có ít nhất 6 ký tự!' }),
        role: z.string({ required_error: 'Role không được để trống!' }),
        address: z
            .string({ required_error: 'Địa chỉ không được để trống!' })
            .min(3, { message: 'Địa chỉ ít nhất phải có 10 ký tự !' }),
        image: !id
            ? z
                  .custom<FileList>((val) => val instanceof FileList, 'Xin hãy upload ảnh!')
                  .refine((files) => files?.length >= 1, `Xin hãy upload ảnh!`)
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
            store_id: undefined,
            name: '',
            email: '',
            phone: '',
            address: '',
            image: undefined,
        },
    });

    const onSubmit: SubmitHandler<IFormStaff> = async (data) => {
        try {
            const formData = new FormData();
            // eslint-disable-next-line camelcase
            const { store_id, role, name, address, phone, password, email } = data;
            const image = data.image?.[0];
            console.log(image);
            if (!id) {
                formData.append('store_id', store_id);
                formData.append('role', `${role}`);
                formData.append('name', name);
                formData.append('address', address);
                formData.append('email', email);
                formData.append('phone', phone);
                formData.append('address', address);
                formData.append('image', image);
                formData.append('password', password || '');
                createStaff(formData);
            } else {
                formData.append('store_id', store_id);
                formData.append('role', `${role}`);
                formData.append('name', name);
                formData.append('address', address);
                formData.append('email', email);
                formData.append('phone', phone);
                formData.append('address', address);
                formData.append('password', password || '');
                formData.append('_method', 'PUT');

                if (!isSaveImage) {
                    formData.append('image', image);
                }
                updateStaff({
                    formdata: formData,
                    id,
                });
            }
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
                title: `${!id ? t('add.success') : t('edit.success')}`,
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
        if (createStaffState.isError) {
            toast({
                title: `${!id ? t('add.error') : t('edit.error')}`,
                status: 'destructive',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createStaffState, id, detailStaff, updateStaffState]);
    return (
        <div className='mx-auto justify-center overflow-y-auto px-4 xl:pt-0'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='pt-8 md:grid md:grid-cols-2 md:gap-3 2xl:pt-0'>
                    <div className='flex flex-col items-center'>
                        {/* Name */}
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

                        {/* Email */}
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

                        {/* Password */}
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItemDisplay
                                    title='Password'
                                    placeholder='Nhập password nhân viên!'
                                    {...field}
                                    require
                                    type='password'
                                />
                            )}
                        />

                        {/* Phone */}
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

                        {/* Address */}
                        <FormField
                            control={form.control}
                            name='address'
                            render={({ field }) => (
                                <FormItemDisplay
                                    title='Địa chỉ'
                                    placeholder='Nhập địa chỉ!'
                                    {...field}
                                    require
                                    type='text'
                                />
                            )}
                        />
                    </div>

                    <div>
                        {/* Store select */}
                        <FormField
                            control={form.control}
                            name='store_id'
                            render={({ field }) => (
                                <FormItem className='mb-3 flex w-full flex-col'>
                                    <FormLabel>
                                        Cửa hàng <span className='text-[#e41a0f]'>*</span> <br />
                                    </FormLabel>

                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Chọn cửa hàng' className='text' />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            {stores?.map((store) => (
                                                <SelectItem key={store.id} value={store.id.toString()} className='text'>
                                                    {store.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Role select */}
                        <FormField
                            control={form.control}
                            name='role'
                            render={({ field }) => (
                                <FormItem className='mb-4'>
                                    <FormLabel>
                                        Quyền <span className='text-[#e41a0f]'>*</span> <br />
                                    </FormLabel>

                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Chọn quyền' className='text' />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            <SelectItem key={0} value={'0'} className='text'>
                                                Admin
                                            </SelectItem>
                                            <SelectItem key={1} value={'1'} className='text'>
                                                Staff
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage className='text' />
                                </FormItem>
                            )}
                        />

                        {/* Image */}
                        <FormField
                            control={form.control}
                            name='image'
                            disabled={id ? isSaveImage : false}
                            render={({ field: { onChange }, formState, fieldState, ...passField }) => (
                                <FormItem className='mb-3 flex w-full flex-col'>
                                    <FormLabel>
                                        {'Image:'}
                                        <span className='text-[#e41a0f]'>*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type='file'
                                            id={imageId}
                                            {...passField}
                                            disabled={id ? isSaveImage : false}
                                            className='w-full rounded-[3px] border border-gray-500 p-2 focus:border-card'
                                            onChange={(event) => {
                                                console.log(event.target.files);
                                                const inputElement = event.target as HTMLInputElement;
                                                if (inputElement.files) {
                                                    const displayUrl = URL.createObjectURL(inputElement.files[0]);
                                                    setPreview(displayUrl);
                                                    onChange(inputElement.files);
                                                    console.log(inputElement.files[0]);
                                                }
                                            }}
                                        ></Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Image preview */}
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
                    </div>

                    <div className='col-span-2 text-center'>
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
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default FormStaff;
