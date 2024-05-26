import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UserRole } from '~/constants/enums';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
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
