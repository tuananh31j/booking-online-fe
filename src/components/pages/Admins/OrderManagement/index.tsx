'use client';

import { useTranslations } from 'next-intl';
import { OrderRow } from '~/components/_common/TableDisplay/Rows/Order/OrderRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import { BookingTableColumnName } from '~/schemas/BookingTableColumnName';
import { useGetBookingsListQuery } from '~/store/services/order.service';
import { IOderResponse } from '~/types/Order';

const OrderManagement = () => {
    const t = useTranslations('Table.Booking');
    const BOOKING_COLUMN_NAMES = BookingTableColumnName(t);

    const { data, isError, isLoading } = useGetBookingsListQuery();

    const listOrder = data?.data.data || [];

    return (
        <div>
            <TableDisplay title={t('title')} columnNames={BOOKING_COLUMN_NAMES}>
                {listOrder.map((item: IOderResponse, i) => (
                    // <div key={i}></div>
                    <OrderRow
                        bookingId={item.booking_id}
                        key={i}
                        name={item.name}
                        phone={item.phone}
                        date={item.date}
                        staffName={item.staff_name}
                        storeName={item.store_name}
                        status={item.status}
                        totalPrice={item.total_price}
                        note={item.note}
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

export default OrderManagement;
