'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
import { addTimes, convertMinutesToHours, convertToDate } from '~/lib/utils';

type TimePicker = {
    hour: number;
    minute: number;
};

const TimePicker = ({ hours, totalTime }: { hours: number[]; totalTime: number }) => {
    const t = useTranslations('Calendar');
    const [selectHour, setSelectHour] = useState<TimePicker | null>(null);
    const durations = [0, 15, 30, 45];
    // const scheduled = { hour: 22, minute: 15 };
    const totalTimeObj = convertMinutesToHours(totalTime);
    const handleSelectHour = (time: number, minute: number) => {
        console.log(time, minute);
        setSelectHour({ hour: time, minute });
    };
    return hours.map((hour: number) => {
        if (hour >= 17) return '';
        return durations.map((minute, index: number) => {
            let isActive = false;
            const isScheduled = false;
            if (selectHour) {
                const timeDone = addTimes(selectHour, totalTimeObj);
                if (
                    convertToDate(timeDone) >= convertToDate({ hour, minute }) &&
                    convertToDate(timeDone) >= convertToDate(selectHour) &&
                    convertToDate(selectHour) <= convertToDate({ hour, minute })
                ) {
                    isActive = true;
                } else {
                    isActive = false;
                }
                // isActive =
                //     selectHour &&
                //      &&
                //      &&
                //     convertToDate(timeDone) >= convertToDate({ hour, minute });
                console.log(timeDone, isActive, totalTimeObj, selectHour);
            }
            return (
                <div
                    onClick={() => handleSelectHour(hour, minute)}
                    key={index}
                    className={`${isActive ? 'bg-pink-600 text-background' : 'hover:bg-gray-400'} ${isScheduled ? 'pointer-events-none bg-background text-foreground' : ''} cursor-pointer border border-solid bg-foreground p-2 text-center text-background transition-colors duration-300 hover:border-gray-300`}
                >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className={`${isScheduled ? 'select-none text-card opacity-25' : ''}`}>
                                    <span>
                                        {hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')}
                                    </span>
                                    <span className={`block ${isScheduled ? '' : ''}`}>
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
