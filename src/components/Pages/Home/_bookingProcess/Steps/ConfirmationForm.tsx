'use client';

import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { cn } from '~/lib/utils';
import { useTranslations } from 'next-intl';
import { useId, useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Input } from '~/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';

const ConfirmationForm = () => {
    const [date, setDate] = useState<Date>();
    const t = useTranslations('ConfirmBookingForm');

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
                        {t('Fullname.label')}
                    </Label>
                    <Input placeholder={t('Fullname.placeholder')} id={inputId.fullnameId}></Input>
                </div>
                <div className='mb-3'>
                    <Label className='text-base' htmlFor={inputId.emailId}>
                        {t('Email.label')}
                    </Label>
                    <Input placeholder={t('Email.placeholder')} id={inputId.emailId}></Input>
                </div>

                <div className='mb-3'>
                    <Label className='text-base' htmlFor={inputId.phoneNumberId}>
                        {t('phonenumber.label')}
                    </Label>
                    <div className='flex items-center justify-between gap-3'>
                        <Input
                            placeholder={t('phonenumber.placeholder')}
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
                    {t('confirm')}
                </Button>
            </form>
        </div>
    );
};

export default ConfirmationForm;
