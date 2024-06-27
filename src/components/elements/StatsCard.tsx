'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    amount: string;
    percentage: number;
    since: string;
    icon: LucideIcon;
    bgColor: string;
    iconColor: string;
    className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
    title,
    amount,
    percentage,
    since,
    icon: Icon,
    bgColor,
    iconColor,
    className,
}) => {
    return (
        <div className={`mb-6 flex flex-col justify-between sm:w-1/2 xl:mb-0 xl:w-1/4 ${className}`}>
            <div className='dark:bg-slate-850 dark:shadow-dark-xl w-[95%] rounded-2xl bg-card shadow-xl'>
                <div className='w-full p-4'>
                    <div>
                        <div className='-mx-3 flex'>
                            <div className='w-2/3 max-w-full flex-none px-3'>
                                <div>
                                    <p className='mb-0 font-sans text-sm font-semibold uppercase leading-normal dark:text-white dark:opacity-60'>
                                        {title}
                                    </p>
                                    <h5 className='mb-2 font-bold dark:text-white'>{amount}</h5>
                                </div>
                            </div>
                            <div className='basis-1/3 px-3 text-right'>
                                <div className={`rounded-circle inline-block h-12 w-12 text-center ${bgColor}`}>
                                    <Icon className={`relative left-3 top-3.5 text-lg ${iconColor}`} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className='mb-0 dark:text-white dark:opacity-60'>
                                <span
                                    className={`text-sm font-bold leading-normal ${percentage > 0 ? 'text-emerald-500' : 'text-red-600'}`}
                                >
                                    {percentage}%
                                </span>
                                {since}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
