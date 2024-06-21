import { FC } from 'react';
import TableCell from '../../_components/TableCell';

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
            <TableCell>{index}</TableCell>
            <TableCell>{day}</TableCell>
            <TableCell>{storeAddress}</TableCell>
            <TableCell>{storeName}</TableCell>
            <TableCell>{startTime}</TableCell>
            <TableCell>{endTime}</TableCell>
            <TableCell>{createdAt}</TableCell>
        </tr>
    );
};

export { ORDER_COLUMN_NAMES, ScheduleRow };
