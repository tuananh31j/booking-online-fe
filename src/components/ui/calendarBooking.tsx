/* eslint-disable no-shadow */

'use client';

import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DayPicker } from 'react-day-picker';

import { cn } from '~/lib/utils';
import { buttonVariants } from '~/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
    specialDays?: Date[];
};
function CalendarBooking({ className, classNames, specialDays, showOutsideDays = true, ...passProps }: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn('p-3', className)}
            classNames={{
                months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                month: 'space-y-4',
                caption: 'flex pt-1 md:px-5 relative items-center md:mb-[35px]',
                caption_label: 'text-2xl font-medium',
                nav: 'space-x-1 flex items-center',
                nav_button: cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
                ),
                nav_button_previous: 'absolute  right-12',
                nav_button_next: 'absolute  right-3',
                table: 'w-full border-collapse space-y-1',
                head_row: 'flex',
                head_cell: 'text-muted-foreground rounded-md w-8 md:w-[50px] font-normal text-[1rem]',
                row: 'flex w-full mt-2',
                cell: cn(
                    'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
                    passProps.mode === 'range'
                        ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
                        : '[&:has([aria-selected])]:rounded-md'
                ),
                day: cn(
                    buttonVariants({ variant: 'ghost' }),
                    'h-8 w-8 md:h-[50px] md:w-[60px] p-0 font-normal lg:text-xl aria-selected:opacity-100 text-default'
                ),
                day_range_start: 'day-range-start',
                day_range_end: 'day-range-end',
                day_selected:
                    'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                day_today: 'bg-accent text-accent-foreground',
                day_outside:
                    'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
                day_disabled: 'text-muted-foreground opacity-0 pointer-events-none',
                day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
                day_hidden: 'invisible',
                ...classNames,
            }}
            modifiers={{
                specialDay: specialDays || new Date(2003, 0, 31),
            }}
            modifiersClassNames={{
                specialDay: 'bg-green-800',
            }}
            // change props to iconProps
            components={{
                IconLeft: ({ ...iconProps }) => <ChevronLeftIcon className='h-8 w-8 ' />,
                IconRight: ({ ...iconProps }) => <ChevronRightIcon className='h-8 w-8' />,
            }}
            {...passProps}
        />
    );
}
CalendarBooking.displayName = 'CalendarBooking';

export { CalendarBooking };
