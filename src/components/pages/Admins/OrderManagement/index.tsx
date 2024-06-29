'use client';

import { lightFormat } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { OrderRow } from '~/components/_common/TableDisplay/Rows/Order/OrderRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import RowSkeleton from '~/components/_common/TableDisplay/_components/Skeleton/RowSkeleton';
import { BookingTableColumnName } from '~/schemas/BookingTableColumnName';
import { useGetBookingScheduleQuery } from '~/store/services/user.service';
import { IOderResponse } from '~/types/Order';

const OrderManagement = () => {
    const t = useTranslations('Table.Booking');
    const BOOKING_COLUMN_NAMES = BookingTableColumnName(t);
    const { data, isLoading, error } = useGetBookingScheduleQuery();

    const [memessage, setMemessage] = useState('');

    useEffect(() => {
        if (error) {
            setMemessage(t('message'));
        }
    }, [error, data]);

    return (
        <div>
            <TableDisplay title={t('title')} columnNames={BOOKING_COLUMN_NAMES}>
                {data?.data.data.map((order: IOderResponse, i) => (
                    <OrderRow
                        key={i}
                        index={i + 1}
                        day={order.day}
                        time={order.time}
                        status={order.status}
                        storeName={order.store_name}
                        storeAddress={order.store_address}
                    />
                ))}
                <td colSpan={7} className='text-center text-yellow-500'>
                    {memessage}
                </td>
                {isLoading && <RowSkeleton rows={5} cols={BOOKING_COLUMN_NAMES.length} />}
            </TableDisplay>
        </div>
    );
};

export default OrderManagement;
