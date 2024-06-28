'use client';

import { PenLine, Plus, Trash2Icon, Eye } from 'lucide-react';
import { useEffect } from 'react';
import PopupDetailOpening from '~/app/[locale]/(protected)/admin/store/edit/[id]/_components/PopupDetailOpening';
import PopupModal from '~/components/_common/PopupModal';
import FormOpening from '~/components/_common/TableDisplay/Rows/Opening/FormOpening';
import AlertDialogConfirm from '~/components/elements/AlertDialog';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useGetOpeningDetailQuery, useRemoveOneDayMutation } from '~/store/services/opening.service';
import { isMessageError } from '~/types/Error/Helper/Store';
import { IStore } from '~/types/Store';

export default function HourOpening({ store }: { store: IStore }) {
    const { data, isLoading, isError } = useGetOpeningDetailQuery(store.id, { skip: !store.id });
    const [mutate, removeOneDayState] = useRemoveOneDayMutation();
    const opening = data?.data.data;
    const toast = useToastDisplay();
    const handleRemove = (id: number) => {
        mutate(id);
    };
    useEffect(() => {
        if (removeOneDayState.isSuccess) {
            toast({ title: 'Xóa giờ mở cửa thành công', status: 'success' });
        }
        if (isMessageError(removeOneDayState.error)) {
            toast({ title: `${removeOneDayState.error.data.message}`, status: 'destructive' });
        }
    }, [removeOneDayState]);
    return (
        <>
            <div className='w-full px-6'>
                <div className='flex justify-between'>
                    <h3 className='mb-2 text-xl'>Thông tin ngày mở cửa</h3>
                    <PopupModal
                        id={store.id}
                        Form={FormOpening}
                        btnName={
                            <span className='flex items-center'>
                                <Plus />
                                Thêm ngày mở cửa
                            </span>
                        }
                        title={`Thêm ngày mở cửa cho cửa hàng ${store.name}`}
                    />
                </div>
                <div className='no-scrollbar max-h-[424px] w-full overflow-y-scroll rounded-md'>
                    <div className='flex  w-full flex-wrap gap-x-6 gap-y-3  text-lg dark:text-white'>
                        {!isLoading &&
                            opening?.length &&
                            !isError &&
                            opening?.map((item, index) => {
                                return (
                                    <div key={index} className='mb-2 flex gap-3 rounded-md bg-content p-5'>
                                        <div>
                                            <p className='flex items-center gap-2'>
                                                <strong>Day:</strong>
                                                {item.day}
                                            </p>
                                            <p className=' flex items-center gap-2'>
                                                <strong>Opening Time:</strong>
                                                {item.opening_time}
                                            </p>
                                            <p className='flex items-center gap-2'>
                                                <strong>Closing Time:</strong>
                                                {item.closing_time}
                                            </p>
                                        </div>
                                        <div className='flex flex-col items-center justify-between'>
                                            <PopupDetailOpening store={store} detail={item}>
                                                <PenLine />
                                            </PopupDetailOpening>
                                            <AlertDialogConfirm
                                                type='button'
                                                handleConfirm={handleRemove}
                                                content={{
                                                    title: 'Bạn có chắc chắn không?',
                                                    description: `Bạn có chắc chắn muốn xóa ngày ${item.day}`,
                                                    idContent: item.id,
                                                }}
                                            >
                                                <Trash2Icon className='h-4 w-4 cursor-pointer duration-300 hover:text-red-500' />
                                            </AlertDialogConfirm>
                                        </div>
                                    </div>
                                );
                            })}

                        {isError && (
                            <div className='mt-6 w-full shrink-0 text-center'>Cửa hàng chưa có lịch mở cửa</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
