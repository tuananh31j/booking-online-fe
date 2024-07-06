'use client';

import { PenLine, Plus, Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import FormOpening from '~/components/_common/TableDisplay/Rows/Opening/FormOpening';
import AlertDialogConfirm from '~/components/elements/AlertDialog';
import PopupDetailOpening from '~/components/pages/Admins/StoreManagement/_components/PopupDetailOpening';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useGetOpeningDetailQuery, useRemoveOneDayMutation } from '~/store/services/opening.service';
import { isMessageError } from '~/types/Error/Helper/Store';
import { IOpeningByIdStoreResponse } from '~/types/Opening';
import { IStore } from '~/types/Store';

export default function HourOpening({ store }: { store: IStore }) {
    const t = useTranslations('Table.Store');

    const { data, isLoading, isError } = useGetOpeningDetailQuery(store.id, { skip: !store.id });
    const [mutate, removeOneDayState] = useRemoveOneDayMutation();
    const [sortedData, setDataSorted] = useState<IOpeningByIdStoreResponse[]>();
    useEffect(() => {
        if (data?.data) {
            const sorted = [...data.data.data].sort((a, b) => {
                const dateA = new Date(a.day).getTime();
                const dateB = new Date(b.day).getTime();
                return dateA - dateB;
            });
            setDataSorted(sorted);
        }
    }, [data]);
    const toast = useToastDisplay();
    const handleRemove = (id: number) => {
        mutate(id);
    };

    useEffect(() => {
        if (removeOneDayState.isSuccess) {
            toast({ title: t('delete_hours.success'), status: 'success' });
        }
        if (isMessageError(removeOneDayState.error)) {
            toast({ title: `${removeOneDayState.error.data.message}`, status: 'destructive' });
        }
    }, [removeOneDayState]);
    return (
        <>
            <div className='w-full px-6'>
                <div className='flex justify-between'>
                    <h3 className='mb-2 text-xl'>{t('settings.opening_hours.title')}</h3>
                    <PopupModal
                        id={store.id}
                        Form={FormOpening}
                        btnName={
                            <span className='flex items-center'>
                                <Plus />
                                {t('settings.opening_hours.add_btn')}
                            </span>
                        }
                        title={`${t('settings.opening_hours.form.title')} ${store.name}`}
                    />
                </div>
                <div className='no-scrollbar max-h-[460px] w-full overflow-y-scroll rounded-md'>
                    <div className='flex  w-full flex-wrap gap-x-6 gap-y-3  text-lg dark:text-white'>
                        {!isLoading &&
                            sortedData?.length &&
                            !isError &&
                            sortedData.map((item, index) => {
                                const currentDate = new Date();
                                currentDate.setDate(new Date().getDate() - 1);
                                const openingDate = new Date(item.day);
                                const isPastDate = currentDate > openingDate;
                                return (
                                    <div key={index} className='mb-2 flex gap-3 rounded-md bg-content p-5'>
                                        <div>
                                            <p className='flex items-center gap-2'>
                                                <strong>{t('settings.opening_hours.card.day')}:</strong>
                                                {item.day}
                                            </p>
                                            <p className=' flex items-center gap-2'>
                                                <strong>{t('settings.opening_hours.card.opening_time')}:</strong>
                                                {item.opening_time}
                                            </p>
                                            <p className='flex items-center gap-2'>
                                                <strong>{t('settings.opening_hours.card.closing_time')}:</strong>
                                                {item.closing_time}
                                            </p>
                                        </div>
                                        <div className='flex flex-col items-center justify-between'>
                                            {!isPastDate && (
                                                <PopupDetailOpening store={store} detail={item}>
                                                    <PenLine />
                                                </PopupDetailOpening>
                                            )}
                                            {isPastDate && (
                                                <AlertDialogConfirm
                                                    type='button'
                                                    content={{
                                                        title: t('settings.opening_hours.past_date_alert.title'),
                                                        description: `${t('settings.opening_hours.past_date_alert.day')} ${item.day} ${t('settings.opening_hours.past_date_alert.description')}`,
                                                        idContent: item.id,
                                                    }}
                                                >
                                                    <PenLine />
                                                </AlertDialogConfirm>
                                            )}
                                            <AlertDialogConfirm
                                                type='button'
                                                handleConfirm={handleRemove}
                                                content={{
                                                    title: t('confirm.title'),
                                                    description: t('confirm.description'),
                                                    idContent: item.id,
                                                }}
                                            >
                                                <Trash2Icon className='h-4 w-4 cursor-pointer duration-300 hover:text-red-500' />
                                            </AlertDialogConfirm>
                                        </div>
                                    </div>
                                );
                            })}

                        {!sortedData?.length && (
                            <div className='mt-6 w-full shrink-0 text-center'>{t('settings.opening_hours.null')}</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
