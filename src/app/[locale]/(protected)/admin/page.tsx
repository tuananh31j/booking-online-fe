import { redirect } from 'next/navigation';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export default function AdminRedirectToDashboard() {
    const isAuth = cookies.get('accessToken');
    const user = cookies.get('user');
    if (!isAuth && user && user.role !== 0) {
        return redirect('/404');
    }

    return redirect('/admin/dashboard');
}
