import React, { FC, ReactNode } from 'react';

type ITHeadColProps = { children: ReactNode };
type ITableHeadProps = { data: string[] };

const THeadCol: FC<ITHeadColProps> = ({ children }) => {
    return (
        <th className='text-xxs border-b-solid tracking-none border-collapse whitespace-nowrap border-b bg-transparent py-3 text-left align-middle font-bold uppercase text-slate-400 opacity-70 shadow-none dark:border-white/40 dark:text-white'>
            {children}
        </th>
    );
};

const TableHead: FC<ITableHeadProps> = ({ data }) => {
    return (
        <thead className='align-bottom'>
            <tr>
                {data.map((item, i) => (
                    <THeadCol key={i}>{item}</THeadCol>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;
