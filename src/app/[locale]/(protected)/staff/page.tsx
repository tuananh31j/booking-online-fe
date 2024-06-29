import { redirect } from 'next/navigation';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export default function StaffRedirectToSchedules() {
    const isAuth = cookies.get('accessToken');
    if (!isAuth) {
        return redirect('/404');
    }

    return redirect('/staff/schedules');
}
