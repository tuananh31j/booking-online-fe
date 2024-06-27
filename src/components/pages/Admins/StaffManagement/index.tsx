'use client';

import { formatDate } from 'date-fns';
import { useEffect } from 'react';
import { USER_COLUMN_NAMES, UserRow } from '~/components/_common/TableDisplay/Rows';
import FormStaff from '~/components/_common/TableDisplay/Rows/Staff/FormStaff';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useDeleteStaffMutation, useGetListStaffQuery } from '~/store/services/staff.service';

const StaffListManager = () => {
    const { data } = useGetListStaffQuery();
    const toast = useToastDisplay();
    const [mutate, { isSuccess, isError }] = useDeleteStaffMutation();
    const handleRemoveStore = (id: number) => {
        mutate(id);
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
        <TableDisplay
            title='Danh sách nhân viên'
            columnNames={USER_COLUMN_NAMES}
            action={{ element: FormStaff, modalTitle: 'Thêm mới nhân viên' }}
        >
            {data?.data.data.map((item) => (
                <UserRow
                    key={item.id}
                    id={item.id}
                    action={handleRemoveStore}
                    image={item.image}
                    name={item.name}
                    email={item.email}
                    role={item.role}
                    phone={item.phone}
                    address={item.address}
                    store_id={item.store_id}
                    createAt={item.updated_at ? formatDate(item.updated_at, 'yyyy/MM/dd | hh:mm:ss') : ''}
                />
            ))}
        </TableDisplay>
    );
};

export default StaffListManager;
