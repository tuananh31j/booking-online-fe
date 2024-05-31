'use client';

import { ORDER_COLUMN_NAMES, OrderRow } from '~/components/_common/TableDisplay/Rows/OrderRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';

const dataFake = [
    {
        facility: 'Nail kitchen 1',
        service: 'Manicure',
        date: '2022-01-01',
        time: '19:30',
        employee: 'John Doe',
        booker: 'Dave Smith',
    },
    {
        facility: 'Nail kitchen 2',
        service: 'Pedicure',
        date: '2022-02-15',
        time: '20:45',
        employee: 'Alice Johnson',
        booker: 'Bob Brown',
    },
];

const OrderManagement = () => {
    return (
        <div>
            <TableDisplay title='Order Management' columnNames={ORDER_COLUMN_NAMES}>
                {dataFake.map((item, i) => (
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
            </TableDisplay>
        </div>
    );
};

export default OrderManagement;
