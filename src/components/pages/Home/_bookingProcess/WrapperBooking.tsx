'use client';

import { ArrowBigRightDash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, ReactNode } from 'react';
import { SkeletonCard } from '~/components/_common/SkeletonCard';
import useBooking from '~/hooks/useBooking';
import { cn } from '~/lib/utils';

type IWrapperBookingProps = {
    stepKeyTranslation: string;
    isLoading: boolean;
    isButtonNextStep?: { active: boolean; isHide: boolean };
    children?: ReactNode;
};

const WrapperBooking: FC<IWrapperBookingProps> = ({ stepKeyTranslation, isButtonNextStep, isLoading, children }) => {
    const t = useTranslations('StepBooking');
    const { nextToStep } = useBooking();

    return (
        <div>
            <div className='mb-[35px] flex items-center  justify-between  text-2xl text-default'>
                <span className='font-medium'>{t(stepKeyTranslation)}</span>
                {isButtonNextStep && !isButtonNextStep.isHide && (
                    <button
                        onClick={() => {
                            if (isButtonNextStep.active) {
                                nextToStep();
                            }
                        }}
                        className={cn({
                            ['opacity-10']: !isButtonNextStep.active,
                            ['animate-bounce duration-150']: isButtonNextStep.active,
                        })}
                        disabled={!isButtonNextStep.active}
                    >
                        <span className='flex items-center gap-1'>
                            {t('Service.continue_btn')} <ArrowBigRightDash />
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
