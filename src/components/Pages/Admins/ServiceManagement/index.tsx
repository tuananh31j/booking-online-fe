'use client';

import { ORDER_COLUMN_NAMES, ServiceRow } from '~/components/_common/TableDisplay/Rows/ServiceRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';

const dataFake = [
    {
        id: '001',
        name: 'Full Body Massage',
        category: 'Wellness',
        description: 'A relaxing full body massage to relieve stress and muscle tension.',
        price: '$80',
        createdAt: '10-01-2023',
        updatedAt: '15-01-2023',
    },
    {
        id: '002',
        name: 'Deep Tissue Massage',
        category: 'Therapy',
        description: 'Deep tissue massage therapy for deeper muscle problems.',
        price: '$90',
        createdAt: '01-02-2023',
        updatedAt: '05-02-2023',
    },
    {
        id: '003',
        name: 'Facial Treatment',
        category: 'Beauty',
        description: 'Gentle facial treatment to cleanse and rejuvenate your skin.',
        price: '$50',
        createdAt: '20-02-2023',
        updatedAt: '25-02-2023',
    },
];

const ServiceManagement = () => {
    return (
        <div>
            <TableDisplay title='Service Management' columnNames={ORDER_COLUMN_NAMES}>
                {dataFake.map((item, i) => (
                    <ServiceRow
                        key={i}
                        id={item.id}
                        name={item.name}
                        category={item.category}
                        description={item.description}
                        price={item.price}
                        createdAt={item.createdAt}
                        updatedAt={item.updatedAt}
                    />
                ))}
            </TableDisplay>
        </div>
    );
};

export default ServiceManagement;
