/* eslint-disable no-unused-vars */

import { PenBoxIcon, Trash2Icon } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import FormStore from '~/components/_common/TableDisplay/Rows/Store/FormStore';
import AlertDialogConfirm from '~/components/elements/AlertDialog';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { ScrollArea } from '~/components/ui/scroll-area';
// eslint-disable-next-line import/no-cycle
import { useGetOpeningDetailQuery } from '~/store/services/opening.service';
import TableCell from '../../_components/TableCell';

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
                <div className='flex items-center gap-2'>
                    <Dialog>
                        <DialogTrigger className='hover:underline' onClick={() => handleDialogOpen(id)}>
                            Chi tiết lịch
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    <div className='pl-2 text-2xl font-normal dark:text-white'>
                                        Lịch mở cửa hàng {name}
                                    </div>
                                </DialogTitle>
                                <ScrollArea className='h-[500px] w-[460px] rounded-md border p-4'>
                                    {isLoading ? (
                                        <p>Loading...</p>
                                    ) : error ? (
                                        <p>Error loading data</p>
                                    ) : (
                                        <div className='flex w-full space-x-5 p-5'>
                                            <div className='w-full space-y-2 text-lg dark:text-white'>
                                                {opening?.map((item: any, index: number) => (
                                                    <div key={index} className='mb-2 w-full'>
                                                        <p className='flex items-center'>
                                                            <strong>Day: </strong>
                                                            {item.day}
                                                            <Button type='submit' size='sm' className='ml-auto px-3'>
                                                                <span className='sr-only'>Copy</span>
                                                                <PenBoxIcon className='h-4 w-4' />
                                                            </Button>
                                                        </p>
                                                        <p>
                                                            <strong>Opening Time:</strong> {item.opening_time}
                                                        </p>
                                                        <p>
                                                            <strong>Closing Time:</strong> {item.closing_time}
                                                        </p>
                                                        <hr className='w-full' />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </ScrollArea>
                            </DialogHeader>
                            <DialogFooter>
                                <Button type='submit'>Create Date</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    |
                    <PopupModal id={id} Form={FormStore} btnName='Edit' title='Chỉnh sửa thông tin cửa hàng' />|
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
