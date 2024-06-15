import { Trash2Icon } from 'lucide-react';
import { FC } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import AlertDialogConfirm from '~/components/elements/AlertDialog';
import FormCategory from './FormCategoy';

type ICategoryRowProps = {
    id: number;
    name: string;
    index: number;
    createAt: string;
    action: (id: number) => void;
};

const CATEGORY_COLUMN_NAMES = ['STT', 'Tên Danh mục', 'Thời gian tạo', 'Tùy chọn'];

const CategoryRow: FC<ICategoryRowProps> = ({ index, id, name, createAt, action }) => {
    return (
        <tr>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <p className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {index}
                </p>
            </td>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <p className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {name}
                </p>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <p className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {createAt}
                </p>
            </td>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='flex items-center gap-2'>
                    <PopupModal id={id} Form={FormCategory} btnName='Edit' title='Chỉnh sửa thông tin danh mục' />
                    <AlertDialogConfirm
                        handleConfirm={action}
                        content={{
                            title: 'Bạn có chắc chắn không?',
                            description: 'Bạn có muốn xóa danh mục này không khi xóa sẽ không thể khổi phục',
                            idContent: id,
                        }}
                    >
                        <Trash2Icon className='h-4 w-4 cursor-pointer duration-300 hover:text-red-500' />
                    </AlertDialogConfirm>
                </div>
            </td>
        </tr>
    );
};

export { CATEGORY_COLUMN_NAMES, CategoryRow };
