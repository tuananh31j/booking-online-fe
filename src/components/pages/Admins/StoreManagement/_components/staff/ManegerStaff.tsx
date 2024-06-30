'use client';

import { lightFormat } from 'date-fns';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import FormSchedule from '~/components/_common/TableDisplay/Rows/Schedule/FormSchedule';
import { ORDER_COLUMN_NAMES, ScheduleRow } from '~/components/_common/TableDisplay/Rows/Schedule/ScheduleRow';
import FormService from '~/components/_common/TableDisplay/Rows/Service/FormService';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import RowSkeleton from '~/components/_common/TableDisplay/_components/Skeleton/RowSkeleton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { useGetListBookingQuery, useGetListStaffClientQuery } from '~/store/services/staff.service';
import { IScheduleResponse } from '~/types/Schedule';
import { IStore } from '~/types/Store';

export default function ManagerStaff({ store }: { store: IStore }) {
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
                    <TableHead>Người dùng</TableHead>
                    <TableHead>Địa chỉ</TableHead>
                    <TableHead>SĐT</TableHead>
                    <TableHead>Email</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* <TableCaption>Quản lý nhân viên</TableCaption> */}
                {isLoading ? (
                    <p>Đang tải dữ liệu...</p>
                ) : error ? (
                    <p>Đã có lỗi xảy ra</p>
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
                                <TableCell>{staff.address || 'thông tin chưa được cập nhật'}</TableCell>
                                <TableCell>{staff.phone || 'thông tin chưa được cập nhật'}</TableCell>
                                <TableCell>{staff.email || 'thông tin chưa được cập nhật'}</TableCell>
                            </TableRow>
                        );
                    })
                )}
            </TableBody>
        </Table>
    );
}
