import { FC, useEffect, useState } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import AlertDialogConfirm from '~/components/elements/AlertDialog';
import { useGetListCategoryQuery } from '~/store/services/category.service';
import FormService from './FormService';

type IServiceRowProps = {
    id: number;
    name: string;
    category: string;
    describe: string;
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
    describe,
    price,
    createdAt,
    updatedAt,
    handleDeleteService,
}) => {
    const { data: categoryData, isLoading: isCategoryLoading } = useGetListCategoryQuery();
    const [catID, setCatID] = useState(0);
    useEffect(() => {
        if (!isCategoryLoading) {
            const categoryId = categoryData?.data.data.find((cat) => cat.name === category)?.id || 0;
            setCatID(categoryId);
        }
    }, [isCategoryLoading]);
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
                    {describe}
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
                    id={id}
                    Form={FormService}
                />
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

export { ORDER_COLUMN_NAMES, ServiceRow };
