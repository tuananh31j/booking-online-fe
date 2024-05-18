'use client';

import useArrowControlBooking from '~/hooks/useArrowControlBooking';
import RenderStep from './_renderStep';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';

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
                <div className='bg-gray px-4 py-3'>
                    <RenderStep step={step} />
                </div>
            </div>
        </>
    );
};

export default BookingProcess;
