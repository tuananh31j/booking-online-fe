'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import OrderFilter from '~/components/_common/FilterOrder';
import { OrderRow } from '~/components/_common/TableDisplay/Rows/Order/OrderRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import { AdminBookingTableColumnName } from '~/schemas/BookingTableColumnName';
import { useAdminGetBookingsListQuery } from '~/store/services/booking.service';
import { IOderResponse } from '~/types/Order';

interface Filter {
    storeName: string | null;
    staffName: string;
    status: string | null;
}

const OrderManagement = () => {
    const t = useTranslations('Table.Booking');
    const BOOKING_COLUMN_NAMES = AdminBookingTableColumnName(t);

    const { data, isError, isLoading } = useAdminGetBookingsListQuery();

    const [filters, setFilters] = useState<Filter>({
        storeName: null,
        staffName: '',
        status: null,
    });

    const handleStoreFilterChange = (storeName: string | null) => {
        setFilters((prevFilters) => ({ ...prevFilters, storeName }));
    };

    const handleStaffFilterChange = (staffName: string) => {
        setFilters((prevFilters) => ({ ...prevFilters, staffName }));
    };

    const handleStatusFilterChange = (status: string | null) => {
        setFilters((prevFilters) => ({ ...prevFilters, status }));
    };

    // Lọc dữ liệu sử dụng useEffect để đảm bảo tính nhất quán
    const [filteredOrders, setFilteredOrders] = useState<IOderResponse[]>([]);
    console.log(filteredOrders);
    useEffect(() => {
        const filtered =
            data?.data.data?.filter((order) => {
                const storeMatch = filters.storeName === 'all' || order.store_name === filters.storeName;
                const statusMatch = filters.status === 'all' || order.status === filters.status;
                const staffMatch =
                    filters.staffName === '' ||
                    order.staff_name.toLowerCase().includes(filters.staffName.toLowerCase());
                return storeMatch && staffMatch && statusMatch;
            }) || [];
        setFilteredOrders(filtered);
    }, [data, filters]);

    console.log(filteredOrders);

    return (
        <div>
            <OrderFilter
                orders={data?.data.data || []} // Truyền data vào OrderFilter
                onStoreFilterChange={handleStoreFilterChange}
                onStaffFilterChange={handleStaffFilterChange}
                onStatusFilterChange={handleStatusFilterChange}
            />
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
