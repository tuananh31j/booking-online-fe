'use client';

import FormService from '~/components/_common/TableDisplay/Rows/Service/FormService';
import { ORDER_COLUMN_NAMES, ServiceRow } from '~/components/_common/TableDisplay/Rows/Service/ServiceRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import RowSkeleton from '~/components/_common/TableDisplay/_components/Skeleton/RowSkeleton';
import {
    useCreateServiceMutation,
    useGetListServiceQuery,
    useRemoveServiceMutation,
} from '~/store/services/service.service';

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
    const { data, isLoading } = useGetListServiceQuery();
    const [mutate, { isLoading: PendingRemove }] = useRemoveServiceMutation();
    const handleDeleteService = (id: number) => {
        mutate(id);
    };
    const [createService, { isLoading: pendingCreate }] = useCreateServiceMutation();
    const service = data?.data?.data;
    return (
        <div>
            <TableDisplay
                title='Service Management'
                columnNames={ORDER_COLUMN_NAMES}
                action={{ element: FormService, modalTitle: 'Thêm mới dịch vụ' }}
            >
                {!isLoading &&
                    !PendingRemove &&
                    service?.map((item, i) => (
                        <ServiceRow
                            key={i}
                            id={item.id}
                            name={item.name}
                            category={item.categorie_id}
                            description={item.describe}
                            price={item.price}
                            createdAt={item.created_at}
                            updatedAt={item.updated_at}
                            handleDeleteService={handleDeleteService}
                        />
                    ))}
                {(isLoading || PendingRemove) && <RowSkeleton rows={3} cols={ORDER_COLUMN_NAMES.length} />}
            </TableDisplay>
        </div>
    );
};

export default ServiceManagement;
