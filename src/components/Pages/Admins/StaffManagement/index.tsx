import React from 'react';
import { USER_COLUMN_NAMES, UserRow } from '~/components/_common/TableDisplay/Rows';
import FormStaff from '~/components/_common/TableDisplay/Rows/Staff/FormStaff';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import { UserRole } from '~/constants/enums';

const dataFake = [
    {
        avt: 'https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: UserRole.Admin,
        status: true,
        createAt: '2022-01-01',
    },
    {
        avt: 'https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: UserRole.Staff,
        status: false,
        createAt: '2022-02-15',
    },
    {
        avt: 'https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg',
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        role: UserRole.Admin,
        status: true,
        createAt: '2022-03-20',
    },
    {
        avt: 'https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg',
        name: 'Bob Brown',
        email: 'bob.brown@example.com',
        role: UserRole.Staff,
        status: false,
        createAt: '2022-04-10',
    },
    {
        avt: 'https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg',
        name: 'Eve White',
        email: 'eve.white@example.com',
        role: UserRole.Admin,
        status: true,
        createAt: '2022-05-05',
    },
    {
        avt: 'https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg',
        name: 'Michael Green',
        email: 'michael.green@example.com',
        role: UserRole.Admin,
        status: false,
        createAt: '2022-06-30',
    },
    {
        avt: 'https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg',
        name: 'Sarah Black',
        email: 'sarah.black@example.com',
        role: UserRole.Staff,
        status: true,
        createAt: '2022-07-25',
    },
    {
        avt: 'https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg',
        name: 'David Gray',
        email: 'david.gray@example.com',
        role: UserRole.Staff,
        status: false,
        createAt: '2022-08-12',
    },
    {
        avt: 'https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg',
        name: 'Olivia Brown',
        email: 'olivia.brown@example.com',
        role: UserRole.Admin,
        status: true,
        createAt: '2022-09-18',
    },
    {
        avt: 'https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg',
        name: 'William Smith',
        email: 'william.smith@example.com',
        role: UserRole.Staff,
        status: false,
        createAt: '2022-10-22',
    },
];

const StaffListManager = () => {
    return (
        <TableDisplay
            title='Danh sách nhân viên'
            columnNames={USER_COLUMN_NAMES}
            action={{ element: FormStaff, modalTitle: 'Thêm mới nhân viên' }}
        >
            {dataFake.map((item, i) => (
                <UserRow
                    key={i}
                    avt={item.avt}
                    name={item.name}
                    email={item.email}
                    role={item.role}
                    status={item.status}
                    createAt={item.createAt}
                />
            ))}
        </TableDisplay>
    );
};

export default StaffListManager;
