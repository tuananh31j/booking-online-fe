'use client';

import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { RootState, useAppDispatch } from '~/store/store';

type IPopupModalProps = {
    btnName: string | React.ReactNode;
    title: string;
    Form?: React.ElementType;
    className?: string;
    children?: ReactNode;
    id?: number;
};

// className is CSS for only dialogtrigger on line 26
const PopupModal: FC<IPopupModalProps> = ({ btnName, title, className, Form, children, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const handleOpen = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className={className}>{btnName}</DialogTrigger>

                <DialogContent className='w-[700px]'>
                    <DialogHeader>
                        <DialogTitle className='mb-4 text-2xl'>{title}</DialogTitle>

                        <div>
                            {Form && !children && <Form id={id} onCloseModal={handleOpen} />} {!Form && children}
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PopupModal;
