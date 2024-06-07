import React from 'react';
import { Skeleton } from '~/components/ui/skeleton';

export default function RowSkeleton({ rows, cols }: { rows: number; cols: number }) {
    const colsArr = Array.from({ length: rows }, (_, index) => index);
    const items = Array.from({ length: cols }, (_, index) => index);
    return (
        <>
            {colsArr.map((_, key) => (
                <tr key={key}>
                    {items.map((item, i) => (
                        <td
                            key={i}
                            className=' whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'
                        >
                            <div className='flex h-12 items-center'>
                                <Skeleton className='h-8 w-full bg-card' />
                            </div>
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}
