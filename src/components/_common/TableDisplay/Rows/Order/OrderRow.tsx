import { FC } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import FormOrder from './FormOrder';
import TableCell from '../../_components/TableCell';

type IOrderRowProps = {
    facility: string;
    service: string;
    date: string;
    time: string;
    employee: string;
    booker: string;
};

const ORDER_COLUMN_NAMES = ['Facility', 'Service', 'Date', 'Time', 'Employee', 'Booker', 'Actions'];

const OrderRow: FC<IOrderRowProps> = ({ facility, service, date, time, employee, booker }) => {
    return (
        <tr>
            <TableCell>{facility}</TableCell>
            <TableCell>{service}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>{time}</TableCell>
            <TableCell>{employee}</TableCell>
            <TableCell>
                <PopupModal
                    btnName={booker}
                    title="Booker's details"
                    className='mb-0 text-xs font-semibold capitalize leading-tight underline dark:text-white dark:opacity-80'
                >
                    <div className='text-sm font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                        Name: {booker}
                    </div>

                    <div className='text-sm font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                        Phone: 0123456789
                    </div>

                    <div className='text-sm font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                        Address: 123 Example St, Example City
                    </div>

                    <div className='text-sm font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                        Email: {booker.toLowerCase().replace(' ', '.')}@example.com
                    </div>
                </PopupModal>
            </TableCell>
            <TableCell>
                <PopupModal
                    btnName='Edit'
                    className='underline hover:text-blue-800'
                    title="Change the order's information here"
                    Form={FormOrder}
                ></PopupModal>
            </TableCell>
        </tr>
    );
};

export { OrderRow, ORDER_COLUMN_NAMES };
