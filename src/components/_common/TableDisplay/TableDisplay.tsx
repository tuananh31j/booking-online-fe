import { FC, ReactNode } from 'react';
import PaginationDisplay from '~/components/_common/PaginationDisplay';
import TableHead from '~/components/_common/TableDisplay/_components/TableHead';
import Wrapper from '~/components/_common/Wrapper';
import './Style/index.css';

type ITableDisplayProps = {
    title: string;
    columnNames: string[];
    children: ReactNode;
    action?: { element: React.ElementType; modalTitle: string };
};
const TableDisplay: FC<ITableDisplayProps> = ({ title, columnNames, action, children }) => {
    return (
        <Wrapper title={title} action={action}>
            <div className='flex-auto px-0 pb-2 pt-0'>
                <div className='overflow-x-scroll p-0 '>
                    <table className='beauti-table mb-0 w-full border-collapse items-center align-top text-gray-500 dark:border-white/40'>
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
