'use client';

import Image from 'next/image';
import PopupStaffProfile from '~/components/elements/PopupStaffProfile';
import { IStaff } from '~/types/Staff';

export interface IStaffData {
    staff: IStaff;
}

export default function StaffCard(staff: IStaffData) {
    return (
        <div className='px-[2.625rem] py-7'>
            <PopupStaffProfile staff={staff.staff}>
                <div>
                    {staff.staff.image && (
                        <Image
                            src={staff.staff.image}
                            alt={'Staff image'}
                            width={100}
                            height={100}
                            className='w-full'
                        />
                    )}
                </div>
            </PopupStaffProfile>
            <h4 className='bg-card py-4 text-center text-lg'>{staff.staff.name}</h4>
        </div>
    );
}
