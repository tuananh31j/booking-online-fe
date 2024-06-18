'use client';

import { formatDate } from 'date-fns';
import { ORDER_COLUMN_NAMES_OPENING, OpeningRow } from '~/components/_common/TableDisplay/Rows/Opening/OpeningRow';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import { useGetListOpeningQuery } from '~/store/services/opening.service';

const OpeningDayManagement = () => {
    const { data, isLoading } = useGetListOpeningQuery();
    const opening = data?.data?.data;
    return (
        <div>
            <TableDisplay title='Opening Matagemet' columnNames={ORDER_COLUMN_NAMES_OPENING}>
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
