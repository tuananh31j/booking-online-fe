'use client';

/* eslint-disable no-shadow */
import { useState } from 'react';

const useArrowControlBooking = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep((prevStep) => {
            if (prevStep < 5) return prevStep + 1;
            return prevStep;
        });
    };

    const prevStep = () => {
        setStep((prevStep) => {
            if (prevStep > 0) return prevStep - 1;
            return prevStep;
        });
    };
    return { step, prevStep, nextStep };
};

export default useArrowControlBooking;
