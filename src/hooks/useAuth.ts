import Cookies from 'universal-cookie';
import { useTypedSelector } from '~/store/store';

const cok = new Cookies();
const useAuth = () => {
    const user = useTypedSelector((state) => state.auth.user);
    const isAuth = Boolean(user);
    console.log(cok.get('user'), '000000000000000000000000000000000000');
    const isAdmin = Boolean(user && user.role === 0);
    console.log(user);
    return { isAuth, isAdmin };
};

export default useAuth;
