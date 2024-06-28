'use client';

import { formatDate } from 'date-fns';
import { useTranslations } from 'next-intl';
import FormService from '~/components/_common/TableDisplay/Rows/Service/FormService';
import { ServiceRow } from '~/components/_common/TableDisplay/Rows/Service/ServiceRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import RowSkeleton from '~/components/_common/TableDisplay/_components/Skeleton/RowSkeleton';
import { ServiceTableColumnName } from '~/schemas/ServiceTableColumnName';
import { useGetListCategoryQuery } from '~/store/services/category.service';
import { useGetListServiceQuery, useRemoveServiceMutation } from '~/store/services/service.service';

const ServiceManagement = () => {
    const t = useTranslations('Table.Service');
    const SERVICE_COLUMN_NAMES = ServiceTableColumnName(t);

    const { data, isLoading } = useGetListServiceQuery();
    const [mutate, { isLoading: PendingRemove }] = useRemoveServiceMutation();
    const handleDeleteService = (id: number) => {
        mutate(id);
    };
    const { data: categoryData } = useGetListCategoryQuery();
    const service = data?.data?.data;
    return (
        <div>
            <TableDisplay
                title={t('title')}
                columnNames={SERVICE_COLUMN_NAMES}
                action={{ element: FormService, modalTitle: t('modal_title') }}
            >
                {!isLoading &&
                    !PendingRemove &&
                    service?.map((item, i) => (
                        <ServiceRow
                            key={i}
                            index={i + 1}
                            id={item.id}
                            name={item.name}
                            category={
                                categoryData?.data.data.find((cat) => cat.id === item.categorie_id)?.name ||
                                'Chưa xác định'
                            }
                            describe={item.describe}
                            price={item.price}
                            createdAt={item.updated_at ? formatDate(item.updated_at, 'yyyy/MM/dd | hh:mm:ss') : ''}
                            updatedAt={item.updated_at ? formatDate(item.updated_at, 'yyyy/MM/dd | hh:mm:ss') : ''}
                            handleDeleteService={handleDeleteService}
                        />
                    ))}
                {(isLoading || PendingRemove) && <RowSkeleton rows={3} cols={SERVICE_COLUMN_NAMES.length} />}
            </TableDisplay>
        </div>
    );
};

export default ServiceManagement;
