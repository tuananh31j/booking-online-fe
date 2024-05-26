import { FC, ReactNode } from 'react';
import PaginationDisplay from '~/components/_common/PaginationDisplay';
import TableHead from '~/components/_common/TableDisplay/_components/TableHead';
import Wrapper from '~/components/_common/Wrapper';

type ITableDisplayProps = {
    title: string;
    columnNames: string[];
    children: ReactNode;
};

const TableDisplay: FC<ITableDisplayProps> = ({ title, columnNames, children }) => {
    return (
        <Wrapper title={title}>
            <div className='flex-auto px-0 pb-2 pt-0'>
                <div className='overflow-x-auto p-0'>
                    <table className='mb-0 w-full border-collapse items-center align-top text-gray-500 dark:border-white/40'>
                        <TableHead data={columnNames} />
                        <tbody>{children}</tbody>
                    </table>
                </div>
            </div>
            <PaginationDisplay />
        </Wrapper>
    );
};

export default TableDisplay;
