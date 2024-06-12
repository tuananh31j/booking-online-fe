'use client';

import { formatDate } from 'date-fns';
import { USER_COLUMN_NAMES, UserRow } from '~/components/_common/TableDisplay/Rows';
import FormStaff from '~/components/_common/TableDisplay/Rows/Staff/FormStaff';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import { useListStaffClientQuery } from '~/store/services/staff.service';

const StaffListManager = () => {
    const { data } = useListStaffClientQuery();
    return (
        <TableDisplay
            title='Danh sách nhân viên'
            columnNames={USER_COLUMN_NAMES}
            action={{ element: FormStaff, modalTitle: 'Thêm mới nhân viên' }}
        >
            {data?.data.data.map((item, i) => (
                <UserRow
                    key={i}
                    image={item.image}
                    name={item.name}
                    email={item.email}
                    role={item.role}
                    phone={item.phone}
                    address={item.address}
                    createAt={formatDate(item.updated_at, 'yyyy/MM/dd | hh:mm:ss')}
                />
            ))}
        </TableDisplay>
    );
};

export default StaffListManager;
