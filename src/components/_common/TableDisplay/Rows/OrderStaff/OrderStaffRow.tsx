import { FC } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import TableCell from '../../_components/TableCell';
import { PencilIcon } from 'lucide-react';

type IOrderStaffRowProps = {
    index: number;
    day: string;
    time: string;
    status: string;
    storeName: string;
    storeAddress: string;
};

const OrderStaffRow: FC<IOrderStaffRowProps> = ({ index, day, time, status, storeName, storeAddress }) => {
    return (
        <tr>
            <TableCell>{index}</TableCell>
            <TableCell>{day}</TableCell>
            <TableCell>{time}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{storeName}</TableCell>
            <TableCell>{storeAddress}</TableCell>
        </tr>
    );
};

export { OrderStaffRow };
