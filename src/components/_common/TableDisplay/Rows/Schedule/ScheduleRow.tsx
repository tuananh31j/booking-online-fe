import { FC, useEffect, useState } from 'react';

type IScheduleRowProps = {
    index: number;
    day: string;
    time: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};

const ORDER_COLUMN_NAMES = ['#', 'Day', 'Time', 'Status', 'Created At', 'Update At'];

const ScheduleRow: FC<IScheduleRowProps> = ({ index, day, time, status, createdAt, updatedAt }) => {
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
                    {time}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {status}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {createdAt}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {updatedAt}
                </div>
            </td>
        </tr>
    );
};

export { ORDER_COLUMN_NAMES, ScheduleRow };
