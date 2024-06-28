'use client';

import { redirect } from 'next/navigation';
import useAuth from '~/hooks/useAuth';

export default function StaffRedirectToSchedules() {
    const { isAuth } = useAuth();
    if (!isAuth) {
        return redirect('/login');
    }

    return redirect('/staff/schedules');
}
