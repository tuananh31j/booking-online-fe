'use client';

import { formatDate } from 'date-fns';
import { useEffect } from 'react';
import FormStore from '~/components/_common/TableDisplay/Rows/Store/FormStore';
import { STORE_COLUMN_NAMES, StoreRow } from '~/components/_common/TableDisplay/Rows/Store/StoreRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import RowSkeleton from '~/components/_common/TableDisplay/_components/Skeleton/RowSkeleton';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useGetListStoreQuery, useRemoveStoreMutation } from '~/store/services/store.service';
import { IStoreItem } from '~/types/Store';

const StoreListManagement = () => {
    const { data, isLoading } = useGetListStoreQuery();
    const [mutate, { isLoading: PendingRemove, isSuccess, isError }] = useRemoveStoreMutation();
    const store = data?.data?.data;
    const toast = useToastDisplay();
    const handleRemoveStore = (id: number) => {
        mutate(id).unwrap();
    };
    useEffect(() => {
        if (isSuccess) {
            toast({ title: 'Xóa cửa hàng thành công', status: 'success' });
        }
        if (isError) {
            toast({ title: 'Xóa cửa hàng thất bại', status: 'destructive' });
        }
    }, [isSuccess, isError]);
    return (
        <>
            <TableDisplay
                title='Danh sách cửa hàng'
                columnNames={STORE_COLUMN_NAMES}
                action={{ element: FormStore, modalTitle: 'Thêm mới cửa hàng' }}
            >
                {!isLoading &&
                    !PendingRemove &&
                    store?.map((item: IStoreItem, i: number) => (
                        <StoreRow
                            key={i}
                            id={item.id}
                            no={i + 1}
                            name={item.name}
                            image={item.image}
                            address={item.address}
                            phone={item.phone}
                            createAt={formatDate(item.created_at, 'yyyy/MM/dd | hh:mm:ss')}
                            action={handleRemoveStore}
                        />
                    ))}
                {isLoading && <RowSkeleton rows={3} cols={STORE_COLUMN_NAMES.length} />}
                {PendingRemove && <RowSkeleton rows={3} cols={STORE_COLUMN_NAMES.length} />}
            </TableDisplay>
        </>
    );
};

export default StoreListManagement;
