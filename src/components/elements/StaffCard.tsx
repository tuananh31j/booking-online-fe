'use client';

import Image from 'next/image';
import PopupStaffProfile from '~/components/elements/PopupStaffProfile';
import { IStaff } from '~/types/Staff';
import { Tooltip, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';
import { FC } from 'react';
import StaticImages from '~/static';

export interface IStaffData {
    staff: IStaff;
    handleGetStaff: () => void;
}

const StaffCard: FC<IStaffData> = ({ staff, handleGetStaff }) => {
    return (
        <div className='px-[2.625rem] py-7'>
            <PopupStaffProfile staff={staff}>
                <div className='h-[200px]'>
                    <Image
                        src={staff.image || StaticImages.userImageDf}
                        alt={'Staff image'}
                        width={100}
                        height={100}
                        className='max-h-[200px] w-full object-cover'
                    />
                </div>
            </PopupStaffProfile>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <h4
                            onClick={handleGetStaff}
                            className='cursor-pointer bg-card py-4 text-center text-lg underline'
                        >
                            {staff.name}
                        </h4>
                    </TooltipTrigger>
                    <TooltipContent className='rounded-md border border-current bg-card-foreground p-2'>
                        <p className='text-card'>Click to next step!</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};
export default StaffCard;
