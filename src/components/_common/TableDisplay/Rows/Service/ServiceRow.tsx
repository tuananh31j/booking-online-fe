import { FC } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import FormService from './FormService';
import PopupBackForm from '~/components/elements/PopupBackForm';
import AlertDialogConfirm from '~/components/elements/AlertDialog';

type IServiceRowProps = {
    id: number;
    name: string;
    category: number | string | boolean;
    description: string;
    price: string;
    createdAt: string;
    updatedAt: string;
    handleDeleteService: (id: number) => void;
};

const ORDER_COLUMN_NAMES = ['ID', 'Name', 'Category', 'Description', 'Price', 'Created At', 'Updated At', 'Actions'];

const ServiceRow: FC<IServiceRowProps> = ({
    id,
    name,
    category,
    description,
    price,
    createdAt,
    updatedAt,
    handleDeleteService,
}) => {
    return (
        <tr className='h-10'>
            <td className='whitespace-nowrap border-b bg-transparent  align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {id}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {name}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {category}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {description}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {price}
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
                    Form={FormService}
                ></PopupModal>{' '}
                |
                <AlertDialogConfirm
                    handleConfirm={handleDeleteService}
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

export { ServiceRow, ORDER_COLUMN_NAMES };
