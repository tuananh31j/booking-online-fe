'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { useGetListStaffClientQuery } from '~/store/services/staff.service';
import { IStore } from '~/types/Store';

export default function ManagerStaff({ store }: { store: IStore }) {
    const t = useTranslations('Table.Store.settings.staff.staff_table');

    const { data, isLoading, error } = useGetListStaffClientQuery(store.id);
    const [listStaff, setlistStaff] = useState(data?.data.data);

    useEffect(() => {
        if (!isLoading) {
            setlistStaff(data?.data.data || []);
        }
    }, [isLoading]);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>{t('thead.Name')}</TableHead>
                    <TableHead>{t('thead.Address')}</TableHead>
                    <TableHead>{t('thead.Phone_number')}</TableHead>
                    <TableHead>{t('thead.Email')}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* <TableCaption>Quản lý nhân viên</TableCaption> */}
                {isLoading ? (
                    <p>{t('trow.loading')}</p>
                ) : error ? (
                    <p>{t('trow.loading_error')}</p>
                ) : (
                    listStaff?.map((staff, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>
                                    <div className='flex items-center '>
                                        <Image
                                            src={staff.image || store.image}
                                            alt='avatar'
                                            width={40}
                                            height={40}
                                            className='mr-4 inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm text-white transition-all duration-200 ease-in-out'
                                        />
                                        <span>{staff.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{staff.address || t('trow.info_not_updated')}</TableCell>
                                <TableCell>{staff.phone || t('trow.info_not_updated')}</TableCell>
                                <TableCell>{staff.email || t('trow.info_not_updated')}</TableCell>
                            </TableRow>
                        );
                    })
                )}
            </TableBody>
        </Table>
    );
}
