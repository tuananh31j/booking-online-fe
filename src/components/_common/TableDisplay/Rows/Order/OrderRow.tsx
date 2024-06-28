import { FC } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import FormOrder from './FormOrder';
import TableCell from '../../_components/TableCell';
import { useTranslations } from 'next-intl';

type IOrderRowProps = {
    name: string;
    phone: string;
    date: string;
    staffName: string;
    storeName: string;
    status: string;
    totalPrice: string;
    bookingId: number;
    note: string;
};

const OrderRow: FC<IOrderRowProps> = ({
    name,
    phone,
    date,
    staffName,
    storeName,
    status,
    totalPrice,
    bookingId,
    note,
}) => {
    return (
        <tr>
            <TableCell> {name}</TableCell>
            <TableCell> {phone}</TableCell>
            <TableCell> {date}</TableCell>
            <TableCell> {staffName}</TableCell>
            <TableCell> {storeName}</TableCell>
            <TableCell> {status}</TableCell>
            <TableCell> {totalPrice}</TableCell>
            <TableCell> {note}</TableCell>

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

export { OrderRow };
