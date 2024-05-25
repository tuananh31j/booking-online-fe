import React from 'react';
import ArrowIcon from '~/components/_icons/arrow/Arrow';
import MapIcon from '~/components/_icons/map/Map';
import PopupLocationDetails from './PopupLocationDetails';
import useArrowControlBooking from '~/hooks/useArrowControlBooking';

const LocationCard = ({ nextStep }: { nextStep?: () => void }) => {
    return (
        <>
            <div
                onClick={nextStep}
                className='border-gray mx-auto mt-5 flex cursor-pointer rounded-lg border-b-[3px] border-l-2 border-r-2 border-t-[1px] px-1 py-[8px] duration-300  hover:border-default dark:border-white md:gap-5 md:px-[16p] lg:px-[32px]'
            >
                <PopupLocationDetails>
                    <MapIcon className='dark:invert' />
                </PopupLocationDetails>

                <div className='flex w-full justify-between'>
                    <div className='details'>
                        <div className='address text-2xl font-medium dark:text-white'>
                            Nailkitchen 1 - 62 Tu Hoa, Tay Ho (Westlake Area - near Sheraton Hotel)
                        </div>

                        <div className='small-address text-lg font-medium dark:text-white'>
                            62 Từ Hoa, Hanoi, Hanoi, 10000.
                        </div>
                    </div>

                    <button className='flex items-center'>
                        <ArrowIcon className='dark:invert' />
                    </button>
                </div>
            </div>
        </>
    );
};

export default LocationCard;
