'use client';

/* eslint-disable no-plusplus */

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
import useBooking from '~/hooks/useBooking';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useGetListHoursValidQuery } from '~/store/services/staff.service';

function generateArray(index: number, total: number, prev?: boolean): number[] {
    const result: number[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < total; i++) {
        if (prev) {
            result.push(index - i);
        } else {
            result.push(index + i);
        }
    }
    return result;
}
function checkArrayIntersection(arr1: number[], arr2: number[]): boolean {
    for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) {
            return true;
        }
    }
    return false;
}
const TimePicker = ({ day }: { day: string }) => {
    const t = useTranslations('Calendar');
    const { chooseDateTime } = useBooking();
    const handleMessage = useToastDisplay();
    const { bookingInfo } = useBooking();
    const [isBookedIndexs, setIsBookedIndexs] = useState<number[]>([]);
    const totalServices = bookingInfo.service_ids.length + 1;
    const [pickHour, setPickHour] = useState<{ hour: string; indexs: number[] }>();
    const { data } = useGetListHoursValidQuery({ userId: bookingInfo.user!.id, day });
    const handlePickHour = ({ hour, index }: { hour: string; index: number }) => {
        const isBookedNext = checkArrayIntersection(generateArray(index, totalServices), isBookedIndexs);
        const isBookedPrev = checkArrayIntersection(generateArray(index, totalServices, true), isBookedIndexs);
        if (isBookedNext) {
            if (isBookedPrev || index - totalServices < 0) {
                return handleMessage({ title: t('rejectPickTime') });
            }
            chooseDateTime({ day, time: hour });
            return setPickHour({ hour, indexs: generateArray(index, totalServices, true) });
        }
        chooseDateTime({ day, time: hour });
        return setPickHour({ hour, indexs: generateArray(index, totalServices) });
    };
    useEffect(() => {
        if (data?.data?.data) {
            const bookedIndexes = data.data.data.working_time_slots
                .map((hour, index) => {
                    if (data.data.data.booked_time_slots.includes(hour)) {
                        return index;
                    }
                    return null;
                })
                .filter((index): index is number => index !== null);
            setIsBookedIndexs(bookedIndexes);
        }
    }, [data]);

    return data?.data.data.working_time_slots.map((hour, index) => {
        const isScheduled = isBookedIndexs.includes(index);
        const isActive = pickHour?.indexs.includes(index);
        return (
            <div
                onClick={() => handlePickHour({ hour, index })}
                key={index}
                className={`${isActive ? 'bg-pink-600 text-background' : 'hover:bg-gray-400'} ${isScheduled ? 'pointer-events-none bg-background text-foreground' : ''} cursor-pointer border border-solid bg-foreground p-2 text-center text-background transition-colors duration-300 hover:border-gray-300`}
            >
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div className={`${isScheduled ? 'select-none text-card opacity-25' : ''}`}>
                                <span>{hour}</span>
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
};

export default TimePicker;
