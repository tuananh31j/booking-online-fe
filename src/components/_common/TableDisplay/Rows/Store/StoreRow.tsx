import { Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import FormStore from '~/components/_common/TableDisplay/Rows/Store/FormStore';
import RowSkeleton from '~/components/_common/TableDisplay/_components/Skeleton/RowSkeleton';
import AlertDialogConfirm from '~/components/elements/AlertDialog';

type IStoreRowProps = {
    id: number;
    no: number;
    image: string;
    name: string;
    address: string;
    phone: string;
    createAt: string;
    action: (id: number) => void;
};

const STORE_COLUMN_NAMES = ['STT', 'Tên cửa hàng', 'Địa chỉ', 'Số điện thoại', 'Ngày tạo cửa hàng', 'Tùy chọn'];

const StoreRow: FC<IStoreRowProps> = ({ id, no, image, name, address, phone, createAt, action }) => {
    return (
        <tr>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <p className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    0{no}
                </p>
            </td>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='flex px-2 py-1'>
                    <div>
                        <Image
                            src={image}
                            alt=''
                            width={1150}
                            height={5150}
                            className='mr-4 inline-flex h-9 w-9 items-center justify-center rounded-md text-sm text-white transition-all duration-200 ease-in-out'
                        />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <h6 className='mb-0 text-sm capitalize leading-normal dark:text-white'>{name}</h6>
                    </div>
                </div>
            </td>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <p className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {address}
                </p>
            </td>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <p className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {phone}
                </p>
            </td>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <p className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {createAt}
                </p>
            </td>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='flex items-center gap-2'>
                    <PopupModal id={id} Form={FormStore} btnName='Edit' title='Chỉnh sửa thông tin cửa hàng' />
                    <AlertDialogConfirm
                        handleConfirm={action}
                        content={{
                            title: 'Bạn có chắc chắn không?',
                            description: 'Bạn có muốn xóa sản phẩm này không khi xóa sẽ không thể khổi phục',
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

export { STORE_COLUMN_NAMES, StoreRow };
