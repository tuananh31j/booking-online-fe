/* eslint-disable no-unused-vars */
import { FC, useEffect, useState } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import AlertDialogConfirm from '~/components/elements/AlertDialog';
import { useGetListCategoryQuery } from '~/store/services/category.service';
import FormService from './FormService';
import TableCell from '../../_components/TableCell';
import { useTranslations } from 'next-intl';
import { DeleteIcon, Icon, Pen, PenIcon, PencilIcon, Trash, Trash2Icon } from 'lucide-react';
import { Pencil2Icon } from '@radix-ui/react-icons';

type IServiceRowProps = {
    index: number;
    id: number;
    name: string;
    category: number | string | boolean;
    describe: string;
    price: string;
    duration: number;
    createdAt?: string;
    handleDeleteService: (id: number) => void;
};

const ServiceRow: FC<IServiceRowProps> = ({
    index,
    id,
    name,
    category,
    describe,
    price,
    duration,
    createdAt,
    handleDeleteService,
}) => {
    const t = useTranslations('Table');
    const m = useTranslations('Table.Service.columns');
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
            <TableCell>{index}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{category}</TableCell>
            <TableCell>{describe}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>
                {duration} {m('Minute')}
            </TableCell>
            <TableCell>{createdAt}</TableCell>
            <TableCell>
                <div className='flex items-center gap-2'>
                    <PopupModal
                        btnName={<PencilIcon className='cursor-pointer duration-300 hover:text-blue-500' />}
                        title="Change the service's information here"
                        className='flex items-center underline hover:text-blue-800'
                        id={id}
                        Form={FormService}
                    />
                    <AlertDialogConfirm
                        handleConfirm={handleDeleteService}
                        content={{
                            title: t('Service.confirm.title'),
                            description: t('Service.confirm.description'),
                            idContent: id,
                        }}
                    >
                        <Trash2Icon className='cursor-pointer duration-300 hover:text-red-500'>Delete</Trash2Icon>
                    </AlertDialogConfirm>
                </div>
            </TableCell>
        </tr>
    );
};

export { ServiceRow };
