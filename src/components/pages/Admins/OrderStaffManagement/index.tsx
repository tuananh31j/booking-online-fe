'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { OrderStaffRow } from '~/components/_common/TableDisplay/Rows/OrderStaff/OrderStaffRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import RowSkeleton from '~/components/_common/TableDisplay/_components/Skeleton/RowSkeleton';
import { StaffBookingTableColumnName } from '~/schemas/BookingTableColumnName';
import { useGetBookingScheduleQuery } from '~/store/services/user.service';
import { IOderStaffResponse } from '~/types/OrderStaff';

const OrderStaffManagement = () => {
    const t = useTranslations('Table.Booking');
    const BOOKING_COLUMN_NAMES = StaffBookingTableColumnName(t);
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
                {data?.data.data.map((orderStaff: IOderStaffResponse, i) => (
                    <OrderStaffRow
                        key={i}
                        index={i + 1}
                        day={orderStaff.day}
                        time={orderStaff.time}
                        status={orderStaff.status}
                        storeName={orderStaff.store_name}
                        storeAddress={orderStaff.store_address}
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

export default OrderStaffManagement;
