'use client';

import useArrowControlBooking from '~/hooks/useArrowControlBooking';
import RenderStep from './_renderStep';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import MapIcon from '~/components/_common/Icons/map/Map';
import { useTranslations } from 'next-intl';
import PopupLocationDetails from '~/components/elements/PopupLocationDetails';
import PopupBackForm from '~/components/elements/PopupBackForm';

const BookingProcess = () => {
    const { step, prevStep, nextStep } = useArrowControlBooking();
    const t = useTranslations('StepBooking');
    return (
        <>
            <div>
                <div className='flex items-center justify-between'>
                    <PopupBackForm action={prevStep}>
                        <ArrowBigLeft />
                    </PopupBackForm>
                    <button onClick={nextStep}>
                        <ArrowBigRight />
                    </button>
                </div>
                {step >= 2 && (
                    <div className='mb-[25px] flex items-center justify-between text-sm text-default md:text-2xl'>
                        <span className='font-medium'>
                            Nailkitchen 1 - 62 Tu Hoa, Tay Ho (Westlake Area - near Sheraton Hotel)
                        </span>
                        <PopupLocationDetails>
                            <MapIcon className='h-5 w-5 dark:invert' />
                        </PopupLocationDetails>
                    </div>
                )}
                {step <= 1 && (
                    <div className='mb-[25px] flex items-center  justify-between text-sm text-default md:text-2xl'>
                        <span className='font-medium'>{t('step1')}</span>
                    </div>
                )}
                <div className='no-scrollbar relative max-h-[50vh] min-h-[50vh] overflow-y-scroll bg-content px-4 py-3'>
                    <RenderStep step={step} />
                </div>
            </div>
        </>
    );
};

export default BookingProcess;
