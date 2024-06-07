'use client';

import FormStore from '~/components/_common/TableDisplay/Rows/Store/FormStore';
import { STORE_COLUMN_NAMES, StoreRow } from '~/components/_common/TableDisplay/Rows/Store/StoreRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import RowSkeleton from '~/components/_common/TableDisplay/_components/Skeleton/RowSkeleton';
import { useGetListStoreQuery, useRemoveStoreMutation } from '~/store/services/store.service';

const StoreListManagement = () => {
    const { data, isLoading } = useGetListStoreQuery();
    const [mutate, { isLoading: PendingRemove }] = useRemoveStoreMutation();
    const store = data?.data?.data;
    const demoImage = 'https://i.redd.it/030mmgcrecta1.png';
    const handleRemoveStore = (id: number) => {
        mutate(id);
    };
    return (
        <>
            <TableDisplay
                title='Danh sách cửa hàng'
                columnNames={STORE_COLUMN_NAMES}
                action={{ element: FormStore, modalTitle: 'Thêm mới cửa hàng' }}
            >
                {!isLoading &&
                    !PendingRemove &&
                    store?.map((item, i) => (
                        <StoreRow
                            key={i}
                            id={item.id}
                            no={i + 1}
                            name={item.name}
                            image={demoImage}
                            address={item.address}
                            phone={item.phone}
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
