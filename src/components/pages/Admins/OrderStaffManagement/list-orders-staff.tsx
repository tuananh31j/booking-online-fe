'use client';

import { useTranslations } from 'next-intl';
import { StaffOrdersRow } from '~/components/_common/TableDisplay/Rows/Order/StaffOdersRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import { StaffBookingTableColumnName } from '~/schemas/BookingTableColumnName';
import { useStaffGetBookingsListQuery } from '~/store/services/booking.service';
import { IStaffOderResponse } from '~/types/Order';

const StaffOrderManagement = () => {
    const t = useTranslations('Table.Booking');
    const BOOKING_COLUMN_NAMES = StaffBookingTableColumnName(t);

    const { data } = useStaffGetBookingsListQuery();
    const listOrder = data?.data.data || [];

    return (
        <div>
            <TableDisplay title={t('title')} columnNames={BOOKING_COLUMN_NAMES}>
                {listOrder.map((item: IStaffOderResponse, i) => (
                    <StaffOrdersRow
                        key={i}
                        status={item.status}
                        storeName={item.store_name}
                        storeAddress={item.store_address}
                        time={item.time}
                        day={item.day}
                    />
                ))}
                {listOrder.length <= 0 && (
                    <tr>
                        <td colSpan={7} className='text-center text-amber-500'>
                            {t('empty_table')}
                        </td>
                    </tr>
                )}
            </TableDisplay>
        </div>
    );
};

export default StaffOrderManagement;
