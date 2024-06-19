'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useLoginMutation } from '~/store/services/auth.service';
import { loginAction } from '~/store/slice/auth.slice';
import { useAppDispatch } from '~/store/store';

const cookies = new Cookies();

export default function LoginPage() {
    const t = useTranslations('Login');
    const handleMessage = useToastDisplay();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const formSchema = z.object({
        email: z
            .string({ required_error: `${t('validations.email.required')}` })
            .email({ message: `${t('validations.email.type')}` }),
        password: z
            .string({ required_error: `${t('validations.password.required')}` })
            .min(6, { message: `${t('validations.password.min_length')}` }),
        rememberMe: z.boolean(),
    });
    const [login, loginState] = useLoginMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        login({ email: data.email, password: data.password });
    };

    useEffect(() => {
        console.log(loginState.isError);
        if (loginState.isSuccess) {
            dispatch(loginAction(loginState.data.data));
            handleMessage({ title: 'Đăng nhập thành công!', status: 'success' });
            cookies.set('user', loginState.data.data.data);
            cookies.set('accessToken', loginState.data.data.token);
            if (loginState.data.data.data.role === 0) {
                router.replace('/admin/dashboard');
            } else {
                router.replace('/staff/schedules');
            }
        }
        if (loginState.isError) {
            handleMessage({ title: 'Thông tin đăng nhập sai!', status: 'destructive' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginState]);
    return (
        <div className='background mx-auto flex min-h-screen items-center justify-center'>
            <div className='flex h-screen items-center justify-center'>
                <div className='container relative z-10 mx-auto p-4'>
                    <Card className='card w-96 max-w-md space-y-8 rounded-xl px-8 py-12 shadow-2xl'>
                        <div className='space-y-2 text-center'>
                            <h2 className='reverse text-3xl font-bold'>{t('title')}</h2>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                                {/* Email input */}
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-default'>{t('Email.label')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='email'
                                                    placeholder={t('Email.placeholder')}
                                                    onChange={field.onChange}
                                                    className={`focus:shadow-primary-outline leading-5.6 block w-full appearance-none rounded-lg border border-solid bg-input p-3 text-sm  font-normal text-default outline-none ring ring-offset-2 transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none`}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Password input */}
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-default'>{t('Password.label')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='password'
                                                    placeholder={t('Password.placeholder')}
                                                    onChange={field.onChange}
                                                    className={`focus:shadow-primary-outline leading-5.6 block w-full appearance-none rounded-lg border border-solid bg-input p-3 text-sm font-normal text-default outline-none ring ring-offset-2 transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none`}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Remember me checkbox */}
                                <FormField
                                    control={form.control}
                                    name='rememberMe'
                                    render={({ field }) => (
                                        <FormItem className='mb-4 flex items-center justify-between'>
                                            <div className='flex items-center'>
                                                <Checkbox
                                                    onCheckedChange={field.onChange}
                                                    id='rememberMe'
                                                    className='rounded-10 ml-2 mt-0.5 h-5 w-5 cursor-pointer appearance-none border border-solid border-gray-200 bg-zinc-700/10 transition-all '
                                                />
                                                <FormLabel
                                                    htmlFor='rememberMe'
                                                    className='ml-2 cursor-pointer select-none text-sm font-normal text-default'
                                                >
                                                    {t('Checkbox.label')}
                                                </FormLabel>
                                            </div>
                                            {/* Quên mật khẩu link */}
                                            <Link
                                                href='/quen-mat-khau'
                                                className='text-sm text-blue-600 hover:underline'
                                            >
                                                {t('forgot_password')}
                                            </Link>
                                        </FormItem>
                                    )}
                                />
                                {/* Nút đăng nhập */}
                                <Button
                                    type='submit'
                                    className='w-full bg-primary text-primary-foreground hover:bg-secondary'
                                >
                                    {t('Button')}
                                </Button>
                            </form>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
}
