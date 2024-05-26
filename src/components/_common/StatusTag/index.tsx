import React from 'react';
import { cn } from '~/lib/utils';

const StatusTag = ({ status }: { status: boolean }) => {
    return (
        <span
            className={cn(
                'rounded-1.8 py-1.4 inline-block w-[50%] whitespace-nowrap px-2.5 text-center align-baseline text-xs font-bold uppercase leading-none text-white',
                { ['bg-green-500 text-white']: status, ['bg-red-500 text-white']: !status }
            )}
        >
            {status && 'Online'}
            {!status && 'Offline'}
        </span>
    );
};

export default StatusTag;
