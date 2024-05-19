'use client';

import useArrowControlBooking from '~/hooks/useArrowControlBooking';
import RenderStep from './_renderStep';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import PopupLocationDetails from '../PopupLocationDetails';
import MapIcon from '~/components/_icons/map/Map';

const BookingProcess = () => {
    const { step, prevStep, nextStep } = useArrowControlBooking();
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
                <div className='bg-gray px-4 py-3'>
                    <RenderStep step={step} />
                </div>
            </div>
        </>
    );
};

export default BookingProcess;
