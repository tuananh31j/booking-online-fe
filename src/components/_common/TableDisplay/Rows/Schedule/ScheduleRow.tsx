import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { useGetDetailStoreQuery } from '~/store/services/store.service';

type IScheduleRowProps = {
    index: number;
    id: number;
    // user_id: number;
    storeInformationId: number;
    isValid: number;
    day: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    error: string;
};

const ORDER_COLUMN_NAMES = ['#', 'Day', 'Address', 'Status', 'Start time', 'End Time', 'Created At'];

const ScheduleRow: FC<IScheduleRowProps> = ({
    index,
    id,
    // user_id,
    storeInformationId,
    isValid,
    day,
    startTime,
    endTime,
    createdAt,
    error,
}) => {
    return (
        <tr className='h-10'>
            <td className='whitespace-nowrap border-b bg-transparent  align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {index}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {day}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {storeInformationId}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    <span
                        className={clsx({
                            'text-red-500': isValid === 3,
                            'text-green-500': isValid === 2,
                            'text-amber-500': isValid === 1,
                        })}
                    >
                        {isValid === 3 && 'Đã huỷ lịch '}
                        {isValid === 2 && 'Đã được book '}
                        {isValid === 1 && 'Chưa có khách '}
                        {isValid}
                    </span>
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {startTime}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {endTime}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {createdAt}
                </div>
            </td>
        </tr>
    );
};

export { ORDER_COLUMN_NAMES, ScheduleRow };
