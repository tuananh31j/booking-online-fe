/* eslint-disable no-unused-vars */

import { Cog, Trash2Icon } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import AlertDialogConfirm from '~/components/elements/AlertDialog';
// eslint-disable-next-line import/no-cycle
import { useGetOpeningDetailQuery } from '~/store/services/opening.service';
import TableCell from '../../_components/TableCell';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

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

const StoreRow: FC<IStoreRowProps> = ({ id, no, name, address, phone, createAt, action }) => {
    const t = useTranslations('Table');

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
                    <Link
                        className='cursor-pointer duration-300 hover:text-blue-500'
                        href={`store/edit/[id]`}
                        as={`store/edit/${id}`}
                    >
                        <Cog />
                    </Link>
                    <AlertDialogConfirm
                        handleConfirm={action}
                        content={{
                            title: t('Store.confirm.title'),
                            description: t('Store.confirm.description'),
                            idContent: id,
                        }}
                    >
                        <Trash2Icon className='cursor-pointer duration-300 hover:text-red-500'>Delete</Trash2Icon>
                    </AlertDialogConfirm>
                </div>
            </TableCell>
        </tr>
    );
};

export { StoreRow };
