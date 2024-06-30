import { redirect } from 'next/navigation';

export default function StaffRedirectToSchedules() {
    return redirect('/staff/schedules');
}
