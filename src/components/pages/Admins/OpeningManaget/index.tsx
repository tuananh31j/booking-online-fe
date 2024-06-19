'use client';

import { formatDate, lightFormat } from 'date-fns';
import FormOpening from '~/components/_common/TableDisplay/Rows/Opening/FormOpening';
import { ORDER_COLUMN_NAMES_OPENING, OpeningRow } from '~/components/_common/TableDisplay/Rows/Opening/OpeningRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import { useGetListOpeningQuery, useGetOpeningDetailQuery } from '~/store/services/opening.service';

const OpeningDayManagement = () => {
    const { data, isLoading, error } = useGetListOpeningQuery();

    const opening = data?.data?.data;
    return (
        <div>
            <TableDisplay
                title='Opening Matagemet'
                columnNames={ORDER_COLUMN_NAMES_OPENING}
                action={{ element: FormOpening, modalTitle: 'Đăng ký giờ mở của' }}
            >
                {(error || lightFormat.length === 0) && (
                    <td colSpan={7} className='text-center'>
                        Bạn chưa đăng ký giờ mở cửa nào!
                    </td>
                )}
                {!isLoading &&
                    opening?.map((item, i) => (
                        <OpeningRow
                            key={i}
                            index={i + 1}
                            id={item.id}
                            storeInformationId={item.store_information_id}
                            storeInformation={{
                                id: 1,
                                name: item.store_information.name,
                                address: item.store_information.address,
                            }}
                            day={item.day}
                            openingTime={item.opening_time}
                            closingTime={item.closing_time}
                            createdAt={formatDate(item.updated_at, 'yyyy/MM/dd | hh:mm:ss')}
                            updatedAt={formatDate(item.updated_at, 'yyyy/MM/dd | hh:mm:ss')}
                        />
                    ))}
            </TableDisplay>
        </div>
    );
};

export default OpeningDayManagement;
