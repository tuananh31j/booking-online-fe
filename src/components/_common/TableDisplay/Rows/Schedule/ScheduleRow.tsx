import { FC } from 'react';

type IScheduleRowProps = {
    index: number;
    id: number;
    storeAddress: string;
    // user_id: number;
    storeInformationId: number;
    storeName: string;
    isValid: number;
    day: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    error: string;
};

const ORDER_COLUMN_NAMES = ['#', 'Day', 'Address', 'Store Name', 'Start time', 'End Time', 'Created At'];

const ScheduleRow: FC<IScheduleRowProps> = ({
    index,
    id,
    // user_id,
    storeAddress,
    storeInformationId,
    storeName,
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
                    {storeAddress}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {storeName}
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
