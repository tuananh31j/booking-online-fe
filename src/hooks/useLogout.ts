import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import useToastDisplay from '~/hooks/useToastDisplay';
import { logout } from '~/store/slice/auth/auth.slice';
import { useAppDispatch } from '~/store/store';

const cookies = new Cookies();

const useLogout = () => {
    const hangleMessage = useToastDisplay();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const handleLogout = () => {
        cookies.remove('user', { path: '/' });
        cookies.remove('accessToken', { path: '/' });
        dispatch(logout());
        hangleMessage({ title: 'Logged out!', status: 'default' });
        router.replace('/login');
    };

    return handleLogout;
};

export default useLogout;
