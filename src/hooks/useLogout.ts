'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import useToastDisplay from '~/hooks/useToastDisplay';

const cookies = new Cookies();

const useLogout = () => {
    const hangleMessage = useToastDisplay();
    const router = useRouter();
    const handleLogout = () => {
        cookies.remove('user', { path: '/' });
        cookies.remove('accessToken', { path: '/' });
        console.log(cookies.get('accessToken'));
        hangleMessage({ title: 'Logged out!', status: 'default' });
        router.replace('/login');
    };

    return handleLogout;
};

export default useLogout;
