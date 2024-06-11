'use client';

import FormService from '~/components/_common/TableDisplay/Rows/Service/FormService';
import { ORDER_COLUMN_NAMES, ServiceRow } from '~/components/_common/TableDisplay/Rows/Service/ServiceRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import RowSkeleton from '~/components/_common/TableDisplay/_components/Skeleton/RowSkeleton';
import { useGetListCategoryQuery } from '~/store/services/category.service';
import {
    useCreateServiceMutation,
    useGetListServiceQuery,
    useRemoveServiceMutation,
} from '~/store/services/service.service';

const ServiceManagement = () => {
    const { data, isLoading } = useGetListServiceQuery();
    const [mutate, { isLoading: PendingRemove }] = useRemoveServiceMutation();
    const handleDeleteService = (id: number) => {
        mutate(id);
    };
    const [createService, { isLoading: pendingCreate }] = useCreateServiceMutation();
    const { data: categoryData, isLoading: isCategoryLoading } = useGetListCategoryQuery();
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
                            category={
                                categoryData?.data.data.find((cat) => cat.id === item.categorie_id)?.name ||
                                'Chưa xác định'
                            }
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
