import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import useToastDisplay from '~/hooks/useToastDisplay';
import { logout } from '~/store/slice/auth/auth.slice';
import { useAppDispatch } from '~/store/store';

const cookies = new Cookies();

const useLogout = () => {
    const t = useTranslations('Logout');
    const hangleMessage = useToastDisplay();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        cookies.remove('user', { path: '/' });
        cookies.remove('accessToken', { path: '/' });
        dispatch(logout());
        hangleMessage({ title: t('logout_success'), status: 'default' });
        router.replace('/login');
        router.refresh();
    };

    return handleLogout;
};

export default useLogout;
