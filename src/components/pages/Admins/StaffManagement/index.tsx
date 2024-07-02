'use client';

import { formatDate } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { UserRow } from '~/components/_common/TableDisplay/Rows';
import FormStaff from '~/components/_common/TableDisplay/Rows/Staff/FormStaff';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import useToastDisplay from '~/hooks/useToastDisplay';
import { StaffTableColumnName } from '~/schemas/StaffTableColumnName';
import { useDeleteStaffMutation, useGetListStaffQuery } from '~/store/services/staff.service';

const StaffListManager = () => {
    const t = useTranslations('Table.Staff');
    const STAFF_COLUMN_NAMES = StaffTableColumnName(t);

    const { data } = useGetListStaffQuery();
    const toast = useToastDisplay();
    const [mutate, { isSuccess, isError }] = useDeleteStaffMutation();
    const handleRemoveStore = (id: number) => {
        mutate(id);
    };

    useEffect(() => {
        if (isSuccess) {
            toast({ title: t('delete.success'), status: 'success' });
        }
        if (isError) {
            toast({ title: t('delete.fail'), status: 'destructive' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isError]);
    const sortedData = data?.data.data ? [...data.data.data] : [];

    // Sort by role descending (from 1 to 0)
    sortedData.sort((a, b) => a.role - b.role);
    return (
        <TableDisplay
            title={t('title')}
            columnNames={STAFF_COLUMN_NAMES}
            action={{ element: FormStaff, modalTitle: t('modal_title') }}
        >
            {sortedData.map((item) => (
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
