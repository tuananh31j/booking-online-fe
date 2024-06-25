import { type ClassValue, clsx } from 'clsx';
import { intervalToDuration } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { UserRole } from '~/constants/enums';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function convertMinutesToHours(minutes: number) {
    const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 });
    return { hour: duration.hours || 0, minute: duration.minutes || 0 };
}

export function addTimes(time1: { hour: number; minute: number }, time2: { hour: number; minute: number }) {
    const totalMinutes = time1.minute + time2.minute;
    const extraHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const totalHours = time1.hour + time2.hour + extraHours;

    return { hour: totalHours, minute: remainingMinutes };
}
export function convertToDate(time: { hour: number; minute: number }) {
    const date = new Date();
    date.setHours(time.hour, time.minute, 0, 0);
    return date;
}

export const disPlayRoleName = (role: UserRole) => {
    switch (role) {
        case 0:
            return 'admin';
        case 1:
            return 'staff';
        default:
            return 'unknow';
    }
};
