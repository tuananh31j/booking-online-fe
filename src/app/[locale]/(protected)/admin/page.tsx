import { redirect } from 'next/navigation';

export default function AdminRedirectToDashboard() {
    return redirect('/admin/dashboard');
}
