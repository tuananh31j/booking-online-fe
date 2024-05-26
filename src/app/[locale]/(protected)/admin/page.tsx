import { redirect } from 'next/navigation';

export default function AdminRedirectToDashboard() {
    redirect('/admin/dashboard');
}
