import { Trash2Icon } from 'lucide-react';
import { FC } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import AlertDialogConfirm from '~/components/elements/AlertDialog';
import FormCategory from './FormCategoy';
import TableCell from '../../_components/TableCell';
import { useTranslations } from 'next-intl';

type ICategoryRowProps = {
    id: number;
    name: string;
    index: number;
    createAt: string;
    action: (id: number) => void;
};

const CategoryRow: FC<ICategoryRowProps> = ({ index, id, name, createAt, action }) => {
    const t = useTranslations('Table');

    return (
        <tr>
            <TableCell>{index}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{createAt}</TableCell>
            <TableCell>
                <div className='flex items-center gap-2'>
                    <PopupModal id={id} Form={FormCategory} btnName='Edit' title='Chỉnh sửa thông tin danh mục' />
                    <AlertDialogConfirm
                        handleConfirm={action}
                        content={{
                            title: t('Category.confirm.title'),
                            description: t('Category.confirm.description'),
                            idContent: id,
                        }}
                    >
                        <Trash2Icon className='h-4 w-4 cursor-pointer duration-300 hover:text-red-500' />
                    </AlertDialogConfirm>
                </div>
            </TableCell>
        </tr>
    );
};

export { CategoryRow };
