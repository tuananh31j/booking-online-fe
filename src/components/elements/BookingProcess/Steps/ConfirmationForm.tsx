'use client';

import { Input } from '../../../ui/input';
import { Calendar } from '../../../ui/calendar';
import { useId, useState } from 'react';
import { Button } from '../../../ui/button';
import { Label } from '../../../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { cn } from '~/lib/utils';

const ConfirmationForm = () => {
    const [date, setDate] = useState<Date>();
    const inputId = {
        fullnameId: useId(),
        emailId: useId(),
        phoneNumberId: useId(),
    };
    return (
        <div className=' flex items-center justify-center'>
            <form className='mb-4 w-[500px]'>
                <div className='mb-3'>
                    <Label className='text-base' htmlFor={inputId.fullnameId}>
                        Fullname
                    </Label>
                    <Input placeholder='Enter your full name' id={inputId.fullnameId}></Input>
                </div>
                <div className='mb-3'>
                    <Label className='text-base' htmlFor={inputId.emailId}>
                        Email
                    </Label>
                    <Input placeholder='Enter your email' id={inputId.emailId}></Input>
                </div>

                <div className='mb-3'>
                    <Label className='text-base' htmlFor={inputId.phoneNumberId}>
                        Phone number
                    </Label>
                    <div className='flex items-center justify-between gap-3'>
                        <Input
                            placeholder='Enter your phone number'
                            className='md:w-[50%]'
                            id={inputId.phoneNumberId}
                        ></Input>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    type='button'
                                    className={cn(
                                        'w-[240px] justify-start text-left font-normal',
                                        !date && 'text-muted-foreground'
                                    )}
                                >
                                    <CalendarIcon className='mr-2 h-4 w-4' />
                                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto p-0' align='start'>
                                <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <Button type='submit' className='mt-2 w-full rounded-lg'>
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default ConfirmationForm;
