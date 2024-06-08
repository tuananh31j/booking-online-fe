'use client';

import RowSkeleton from '~/components/_common/TableDisplay/_components/Skeleton/RowSkeleton';
import FormService from '~/components/_common/TableDisplay/Rows/Service/FormService';
import { ORDER_COLUMN_NAMES, ServiceRow } from '~/components/_common/TableDisplay/Rows/Service/ServiceRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import { useGetServicesQuery } from '~/store/services/services.service';
import { IService } from '~/types/Service';

const ServiceManagement = () => {
    const { data, isLoading, isFetching } = useGetServicesQuery();
    const serviceList = data?.data?.data;

    return (
        <div>
            <TableDisplay
                title='Service Management'
                columnNames={ORDER_COLUMN_NAMES}
                action={{ element: FormService, modalTitle: 'Thêm mới dịch vụ' }}
            >
                {isLoading && <RowSkeleton rows={3} cols={ORDER_COLUMN_NAMES.length} />}

                {!isLoading &&
                    !isFetching &&
                    serviceList?.map((service: IService) => <ServiceRow key={service.id} service={service} />)}
            </TableDisplay>
        </div>
    );
};

export default ServiceManagement;
