import { FC } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import FormOrder from './FormOrder';
import TableCell from '../../_components/TableCell';
import { PencilIcon } from 'lucide-react';

type IOrderRowProps = {
    day: string;
    time: string;
    status: string;
    storeName: string;
    storeAddress: string;
};

const StaffOrdersRow: FC<IOrderRowProps> = ({ day, time, status, storeName, storeAddress }) => {
    return (
        <tr>
            <TableCell> {day}</TableCell>
            <TableCell> {status}</TableCell>
            <TableCell> {storeAddress}</TableCell>
            <TableCell> {storeName}</TableCell>
            <TableCell> {time}</TableCell>

            {/* <TableCell>
                <PopupModal
                    btnName={<PencilIcon className='cursor-pointer duration-300 hover:text-blue-500' />}
                    className='flex items-center underline hover:text-blue-800'
                    title="Update Booking's Status"
                    Form={FormOrder}
                    id={bookingId}
                ></PopupModal>
            </TableCell> */}
        </tr>
    );
};

export { StaffOrdersRow };
