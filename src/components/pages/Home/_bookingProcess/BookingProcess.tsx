'use client';

import RenderStep from './_renderStep';
import { ArrowBigLeft } from 'lucide-react';
import MapIcon from '~/components/_common/Icons/map/Map';
import PopupStoreDetails from '~/components/elements/PopupStoreDetails';
import PopupBackForm from '~/components/elements/PopupBackForm';
import useBooking from '~/hooks/useBooking';
import ProgressTimeline from '~/components/_common/ProgressTimeline';

const BookingProcess = () => {
    const { currentStoreInfo, currentStep, backToPrevStep, progressObj } = useBooking();

    return (
        <>
            <div>
                <div className='my-10'>
                    <ProgressTimeline progressObj={progressObj} />
                </div>
                {currentStep >= 2 && currentStoreInfo && (
                    <>
                        <div className='mb-[15px] flex items-center justify-between text-sm font-medium text-default md:text-2xl'>
                            <div className='flex gap-2'>
                                <PopupBackForm action={backToPrevStep}>
                                    <ArrowBigLeft />
                                </PopupBackForm>
                                <p>{currentStoreInfo.name}</p>
                            </div>
                            <PopupStoreDetails
                                name={currentStoreInfo.name}
                                phone={currentStoreInfo.phone}
                                address={currentStoreInfo.address}
                            >
                                <MapIcon className='h-5 w-5 dark:invert' />
                            </PopupStoreDetails>
                        </div>
                    </>
                )}
                <div className='relative  max-h-[78vh] min-h-[78vh] overflow-y-scroll bg-content px-4 py-3 pb-[25vh]'>
                    <RenderStep step={currentStep} />
                </div>
            </div>
        </>
    );
};

export default BookingProcess;
