import { FC } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import AlertDialogConfirm from '~/components/elements/AlertDialog';

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
            <td className='whitespace-nowrap border-b bg-transparent  align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {index}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {day}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {storeInformation.name}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {storeInformation.address}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {openingTime}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {closingTime}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {createdAt}
                </div>
            </td>
            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {updatedAt}
                </div>
            </td>
            <td className='whitespace-nowrap border-b bg-transparent  align-middle capitalize shadow-transparent dark:border-white/40'>
                <PopupModal
                    btnName='Edit'
                    title="Change the service's information here"
                    className='underline hover:text-blue-800'
                    id={id}
                    // Form={FormService}
                />
                |
                <AlertDialogConfirm
                    // handleConfirm={}
                    content={{
                        title: 'Bạn có chắc chắn không?',
                        description: 'Bạn có muốn xóa sản phẩm này không khi xóa sẽ không thể khổi phục',
                        idContent: id,
                    }}
                >
                    <p className='h-4 w-4 cursor-pointer duration-300 hover:text-red-500'>Delete</p>
                </AlertDialogConfirm>
            </td>
        </tr>
    );
};

export { ORDER_COLUMN_NAMES_OPENING, OpeningRow };
