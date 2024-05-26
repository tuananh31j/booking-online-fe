import React from 'react';
import ArrowIcon from '~/components/_common/Icons/arrow/Arrow';
import MapIcon from '~/components/_common/Icons/map/Map';
import PopupLocationDetails from './PopupLocationDetails';

const LocationCard = () => {
    return (
        <>
            <div className='border-gray mx-auto mt-5 flex rounded-lg border-b-[3px] border-l-2 border-r-2 px-1 py-[8px] hover:border-t-[1px] hover:border-pink-300 dark:border-white md:gap-5 md:px-[16p] lg:px-[32px]'>
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

                    <div className='flex items-center'>
                        <ArrowIcon className='dark:invert' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LocationCard;
