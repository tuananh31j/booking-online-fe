'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { OrderRow } from '~/components/_common/TableDisplay/Rows/Order/OrderRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { AdminBookingTableColumnName } from '~/schemas/BookingTableColumnName';
import { useAdminGetBookingsListQuery } from '~/store/services/booking.service';
import { IOderResponse } from '~/types/Order';

const OrderManagement = () => {
    const t = useTranslations('Table.Booking');
    const BOOKING_COLUMN_NAMES = AdminBookingTableColumnName(t);

    const { data } = useAdminGetBookingsListQuery();

    const [selectedStatus, setSelectedStatus] = useState<string>();

    const handleStatusChange = useCallback((status: string | undefined) => {
        setSelectedStatus(status);
    }, []);

    const filteredOrders =
        data?.data.data?.filter((order) => {
            return !selectedStatus || order.status.toLowerCase() === selectedStatus;
        }) || [];

    return (
        <div>
            <div className=' mr-6 flex justify-end gap-4'>
                <Select onValueChange={handleStatusChange} value={selectedStatus}>
                    <SelectTrigger className='w-48'>
                        <SelectValue placeholder='Trạng thái' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='pending'>Đang chờ</SelectItem>
                        <SelectItem value='confirmed'>Đã xác nhận</SelectItem>
                        <SelectItem value='doing'>Đang thực hiện</SelectItem>
                        <SelectItem value='done'>Hoàn thành</SelectItem>
                        <SelectItem value='cancel'>Đã hủy</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <TableDisplay title={t('title')} columnNames={BOOKING_COLUMN_NAMES}>
                {filteredOrders.map((item: IOderResponse, i) => (
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
                {filteredOrders.length <= 0 && (
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
