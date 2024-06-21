import { ReactNode } from 'react';

const TableCell = ({ children }: { children: ReactNode | string }) => {
    return (
        <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
            <p className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                {children}
            </p>
        </td>
    );
};

export default TableCell;
