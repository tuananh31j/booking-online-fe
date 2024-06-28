/* eslint-disable no-unused-vars */
import { FC, useEffect, useState } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import AlertDialogConfirm from '~/components/elements/AlertDialog';
import { useGetListCategoryQuery } from '~/store/services/category.service';
import FormService from './FormService';
import TableCell from '../../_components/TableCell';
import { useTranslations } from 'next-intl';

type IServiceRowProps = {
    index: number;
    id: number;
    name: string;
    category: number | string | boolean;
    describe: string;
    price: string;
    createdAt?: string;
    updatedAt?: string;
    handleDeleteService: (id: number) => void;
};

const ServiceRow: FC<IServiceRowProps> = ({ index, id, name, category, describe, price, handleDeleteService }) => {
    const t = useTranslations('Table');

    const { data: categoryData, isLoading: isCategoryLoading } = useGetListCategoryQuery();
    const [catID, setCatID] = useState(0);
    useEffect(() => {
        if (!isCategoryLoading) {
            const categoryId = categoryData?.data.data.find((cat) => cat.name === category)?.id || 0;
            setCatID(categoryId);
        }
    }, [isCategoryLoading]);
    console.log('catID', catID);

    return (
        <tr className='h-10'>
            <TableCell>{index}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{category}</TableCell>
            <TableCell>{describe}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>
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
                        title: t('Service.confirm.title'),
                        description: t('Service.confirm.description'),
                        idContent: id,
                    }}
                >
                    <p className='h-4 w-4 cursor-pointer duration-300 hover:text-red-500'>Delete</p>
                </AlertDialogConfirm>
            </TableCell>
        </tr>
    );
};

export { ServiceRow };
