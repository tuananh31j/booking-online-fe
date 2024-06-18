'use client';

import { ArrowBigRightDash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, ReactNode } from 'react';
import { SkeletonCard } from '~/components/_common/SkeletonCard';

type IWrapperBookingProps = {
    stepKeyTranslation: string;
    isLoading: boolean;
    handleNextStep?: () => void;
    children?: ReactNode;
};

const WrapperBooking: FC<IWrapperBookingProps> = ({ stepKeyTranslation, handleNextStep, isLoading, children }) => {
    const t = useTranslations('StepBooking');
    return (
        <div>
            <div className='mb-[35px] flex items-center  justify-between  text-2xl text-default'>
                <span className='font-medium'>{t(stepKeyTranslation)}</span>
                {handleNextStep && (
                    <button onClick={handleNextStep}>
                        <span className='flex items-center gap-1'>
                            Tiếp tục <ArrowBigRightDash />
                        </span>
                    </button>
                )}
            </div>
            {isLoading && <SkeletonCard />}
            {children && !isLoading && children}
        </div>
    );
};

export default WrapperBooking;
