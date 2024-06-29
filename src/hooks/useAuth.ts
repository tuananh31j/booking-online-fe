import { useTypedSelector } from '~/store/store';

const useAuth = () => {
    const user = useTypedSelector((state) => state.auth.user);
    const isAuth = Boolean(user);
    const isAdmin = Boolean(user && user.role === 0);

    return { isAuth, isAdmin };
};

export default useAuth;
