'use client';

import { lightFormat } from 'date-fns';
import React, { useEffect } from 'react';
import { ORDER_COLUMN_NAMES, ScheduleRow } from '~/components/_common/TableDisplay/Rows/Schedule/ScheduleRow';
import FormService from '~/components/_common/TableDisplay/Rows/Service/FormService';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import RowSkeleton from '~/components/_common/TableDisplay/_components/Skeleton/RowSkeleton';
import { useGetListBookingQuery } from '~/store/services/staff.service';

export default function ScheduleManagement() {
    const { data, isLoading, error } = useGetListBookingQuery();
    const listSchedule = data?.data.data || [];

    return (
        <div>
            <TableDisplay
                title='Schedules Management'
                columnNames={ORDER_COLUMN_NAMES}
                action={{ element: FormService, modalTitle: 'Thêm mới dịch vụ' }}
            >
                {(error || lightFormat.length === 0) && (
                    <td colSpan={7} className='text-center'>
                        Bạn chưa đăng ký giờ làm nào!
                    </td>
                )}
                {!isLoading && data
                    ? listSchedule.map((item, i) => (
                          <ScheduleRow
                              id={item.id}
                              //   user_id={item.user_id}
                              storeAddress={item.store_address}
                              storeInformationId={item.store_information_id}
                              isValid={item.is_valid}
                              day={item.day}
                              storeName={item.store_name}
                              startTime={item.start_time}
                              endTime={item.end_time}
                              createdAt={item.created_at}
                              error={item.error}
                              key={i}
                              index={i + 1}
                          />
                      ))
                    : ''}
                {isLoading && <RowSkeleton rows={5} cols={ORDER_COLUMN_NAMES.length} />}
            </TableDisplay>
        </div>
    );
}
