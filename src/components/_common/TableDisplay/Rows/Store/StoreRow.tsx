/* eslint-disable no-unused-vars */

import { Trash2Icon } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import FormOpening from '~/components/_common/TableDisplay/Rows/Opening/FormOpening';
import FormStore from '~/components/_common/TableDisplay/Rows/Store/FormStore';
import AlertDialogConfirm from '~/components/elements/AlertDialog';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { ScrollArea } from '~/components/ui/scroll-area';
// eslint-disable-next-line import/no-cycle
import { useGetOpeningDetailQuery } from '~/store/services/opening.service';
import TableCell from '../../_components/TableCell';
import Link from 'next/link';

type IStoreRowProps = {
    id: number;
    no: number;
    name: string;
    address: string;
    phone: string;
    createAt: string;
    action: (id: number) => void;
};
export type IStoreOpeningItem = {
    day: string;
    opening_time: string;
    closing_time: string;
};

const STORE_COLUMN_NAMES = ['STT', 'Tên cửa hàng', 'Địa chỉ', 'Số điện thoại', 'Ngày tạo cửa hàng', 'Tùy chọn'];

const StoreRow: FC<IStoreRowProps> = ({ id, no, name, address, phone, createAt, action }) => {
    const [currentStoreId, setCurrentStoreId] = useState<number>(null!);
    const [isQueryEnabled, setIsQueryEnabled] = useState<boolean>(false);

    const { data, isLoading, error } = useGetOpeningDetailQuery(currentStoreId, {
        skip: !isQueryEnabled, // Skip the query if it's not enabled
    });
    const opening = data?.data?.data;

    // eslint-disable-next-line no-shadow
    const handleDialogOpen = (id: number) => {
        setCurrentStoreId(id);
        setIsQueryEnabled(true);
    };

    useEffect(() => {
        if (currentStoreId === null) {
            setIsQueryEnabled(false);
        }
    }, [currentStoreId]);
    return (
        <tr>
            <TableCell>0{no}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{address}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{createAt}</TableCell>
            <TableCell>
                <div className='flex items-center gap-3'>
                    <Link href={`store/edit/[id]`} as={`store/edit/${id}`}>
                        Settings
                    </Link>
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
            </TableCell>
        </tr>
    );
};

export { STORE_COLUMN_NAMES, StoreRow };
