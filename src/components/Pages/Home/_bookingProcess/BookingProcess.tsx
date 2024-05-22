'use client';

import useArrowControlBooking from '~/hooks/useArrowControlBooking';
import RenderStep from './_renderStep';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import MapIcon from '~/components/_icons/map/Map';
import { useTranslations } from 'next-intl';
import PopupLocationDetails from '~/components/elements/PopupLocationDetails';

const BookingProcess = () => {
    const { step, prevStep, nextStep } = useArrowControlBooking();
    const t = useTranslations('StepBooking');
    return (
        <>
            <div>
                <div className='flex items-center justify-between'>
                    <button onClick={prevStep}>
                        <ArrowBigLeft />
                    </button>
                    <button onClick={nextStep}>
                        <ArrowBigRight />
                    </button>
                </div>
                {step >= 2 && (
                    <div className='details mb-[15px] flex items-center justify-between text-2xl text-default'>
                        <span className='font-medium'>
                            Nailkitchen 1 - 62 Tu Hoa, Tay Ho (Westlake Area - near Sheraton Hotel)
                        </span>
                        <PopupLocationDetails>
                            <MapIcon className='w-8 dark:invert' />
                        </PopupLocationDetails>
                    </div>
                )}
                {step <= 1 && (
                    <div className='details mb-[15px] flex items-center justify-between text-2xl text-default'>
                        <span className='font-medium'>{t('step1')}</span>
                    </div>
                )}
                <div className='min-h-[50vh] bg-content px-4 py-3'>
                    <RenderStep step={step} />
                </div>
            </div>
        </>
    );
};

export default BookingProcess;
