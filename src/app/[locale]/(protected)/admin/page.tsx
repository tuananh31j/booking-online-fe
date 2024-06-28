import { redirect } from 'next/navigation';
import useAuth from '~/hooks/useAuth';

export default function AdminRedirectToDashboard() {
    const { isAdmin } = useAuth();
    console.log(isAdmin, 'dfdfdfdf');
    if (!isAdmin) {
        return redirect('/404');
    }

    return redirect('/admin/dashboard');
}
