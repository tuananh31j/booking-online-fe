'use client';

import { useEffect, useState } from 'react';
import { ORDER_COLUMN_NAMES, OrderRow } from '~/components/_common/TableDisplay/Rows/Order/OrderRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import { useGetBookingsListQuery } from '~/store/services/order.service';
import { IOderResponse } from '~/types/Order';

// const dataFake = [
//     {
//         facility: 'Nail kitchen 1',
//         service: 'Manicure',
//         date: '2022-01-01',
//         time: '19:30',
//         employee: 'John Doe',
//         booker: 'Dave Smith',
//     },
//     {
//         facility: 'Nail kitchen 2',
//         service: 'Pedicure',
//         date: '2022-02-15',
//         time: '20:45',
//         employee: 'Alice Johnson',
//         booker: 'Bob Brown',
//     },
// ];

const OrderManagement = () => {
    const { data, isError, isLoading } = useGetBookingsListQuery();
    const [listOrder, setListOrder] = useState<IOderResponse[]>([]);

    useEffect(() => {
        if (!isError && !isLoading) {
            setListOrder(data?.data.data || []);
        }
    }, [isLoading]);

    return (
        <div>
            <TableDisplay title='Order Management' columnNames={ORDER_COLUMN_NAMES}>
                {listOrder.map((item, i) => (
                    <OrderRow
                        key={i}
                        facility={item.facility}
                        service={item.service}
                        date={item.date}
                        time={item.time}
                        employee={item.employee}
                        booker={item.booker}
                    />
                ))}
                {listOrder.length <= 0 && (
                    <td colSpan={7} className='text-center text-amber-500'>
                        Hiện chưa có order nào!
                    </td>
                )}
            </TableDisplay>
        </div>
    );
};

export default OrderManagement;
