'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';

type TimePicker = {
    hour: number;
    minute: number;
};

const TimePicker = ({ hours }: { hours: number[] }) => {
    const t = useTranslations('Calendar');
    const [selectHour, setSelectHour] = useState<TimePicker>({ hour: 0, minute: 0 });
    const durations = [30, 45];
    const scheduled = { hour: 9, minute: 15 };

    const handleSelectHour = (time: number, minute: number) => {
        console.log(time, minute);
        setSelectHour({ hour: time, minute });
    };
    return hours.map((hour: number) => {
        if (hour >= 17) return '';
        return durations.map((minute, index: number) => {
            const isScheduled = scheduled.hour === hour && scheduled.minute === minute;
            return (
                <div
                    onClick={() => handleSelectHour(hour, minute)}
                    key={index}
                    className={`${selectHour.hour === hour && selectHour.minute === minute ? 'bg-pink-600 text-background' : 'hover:bg-gray-400'} ${isScheduled ? 'pointer-events-none bg-background text-foreground' : ''} cursor-pointer border border-solid bg-foreground p-2 pb-5 text-center text-background transition-colors duration-300 hover:border-gray-300 `}
                >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className={`${isScheduled ? 'select-none text-card opacity-25' : ''}`}>
                                    <span>
                                        {hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')}
                                    </span>
                                    <span className={`block ${isScheduled ? '' : 'pb-5'}`}>
                                        {isScheduled && t('unavailable')}
                                        {!isScheduled && t('available')}
                                    </span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>Time</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            );
        });
    });
};

export default TimePicker;
