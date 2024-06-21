import React, { useState } from 'react';
import FormOpening from '~/components/_common/TableDisplay/Rows/Opening/FormOpening';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { IOpeningByIdStoreResponse } from '~/types/Opening';
import { IStore } from '~/types/Store';

export default function PopupDetailOpening({
    children,
    detail,
    store,
}: {
    children: React.ReactNode;
    detail?: IOpeningByIdStoreResponse;
    store: IStore;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className='flex h-[36px] w-[48px] items-center justify-center rounded-sm bg-primary text-reverse'>
                    {children}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <div className='text-2xl font-bold dark:text-white'>Sửa lịch mở cửa: {detail?.day}</div>
                        </DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
