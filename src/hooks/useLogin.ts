'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useLoginMutation } from '~/store/services/auth.service';
import { loginAction } from '~/store/slice/auth/auth.slice';
import { useAppDispatch } from '~/store/store';

const cookies = new Cookies();

const useLogin = () => {
    const handleMessage = useToastDisplay();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [login, loginState] = useLoginMutation();

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

    return { login, loginState };
};

export default useLogin;
