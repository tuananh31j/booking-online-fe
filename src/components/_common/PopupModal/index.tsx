'use client';

import React, { FC, ReactNode, useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';

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

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className={className}>{btnName}</DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='mb-4 text-2xl'>{title}</DialogTitle>

                        <div>
                            {Form && !children && <Form id={id} onCloseModal={handleOpen} />} {!Form && children}{' '}
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PopupModal;
