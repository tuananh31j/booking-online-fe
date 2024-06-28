import { FC } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import AlertDialogConfirm from '~/components/elements/AlertDialog';
import TableCell from '../../_components/TableCell';
import { PencilIcon, Trash2Icon } from 'lucide-react';

type IOpeningRowProps = {
    index: number;
    id: number;
    storeInformationId: number;
    day: string;
    openingTime: string;
    closingTime: string;
    createdAt: string;
    updatedAt: string;
    storeInformation: {
        id: number;
        name: string;
        address: string;
    };
    // handleDeleteOpening: (id: number) => void;
};

const ORDER_COLUMN_NAMES_OPENING = [
    '#',
    'Day',
    'Store',
    'Address',
    'Opening Time',
    'Closing Time',
    'Created At',
    'Updated At',
    'Actions',
];

const OpeningRow: FC<IOpeningRowProps> = ({
    index,
    id,
    storeInformationId,
    day,
    storeInformation,
    openingTime,
    closingTime,
    createdAt,
    updatedAt,
}) => {
    return (
        <tr className='h-10'>
            <TableCell>{index}</TableCell>
            <TableCell>{day}</TableCell>
            <TableCell>{storeInformation.name}</TableCell>
            <TableCell>{storeInformation.address}</TableCell>
            <TableCell>{openingTime}</TableCell>
            <TableCell>{closingTime}</TableCell>
            <TableCell>{createdAt}</TableCell>
            <TableCell>{updatedAt}</TableCell>
            <TableCell>
                <PopupModal
                    btnName={<PencilIcon className='cursor-pointer duration-300 hover:text-blue-500' />}
                    title="Change the service's information here"
                    id={id}
                    // Form={FormService}
                />
                <AlertDialogConfirm
                    // handleConfirm={}
                    content={{
                        title: 'Bạn có chắc chắn không?',
                        description: 'Bạn có muốn xóa sản phẩm này không khi xóa sẽ không thể khổi phục',
                        idContent: id,
                    }}
                >
                    <Trash2Icon className='cursor-pointer duration-300 hover:text-red-500'>Delete</Trash2Icon>
                </AlertDialogConfirm>
            </TableCell>
        </tr>
    );
};

export { ORDER_COLUMN_NAMES_OPENING, OpeningRow };
