import React, { forwardRef } from 'react';
import PopupLocationDetails from './PopupLocationDetails';
import MapIcon from '~/components/_common/Icons/map/Map';
import ArrowIcon from '~/components/_common/Icons/arrow/Arrow';

interface ILocationCardProps extends React.HTMLProps<HTMLDivElement> {
    nextStep?: () => void;
    data: any;
}

const LocationCard = forwardRef<HTMLDivElement, ILocationCardProps>(({ data, nextStep, ...passProps }, ref) => {
    return (
        <>
            <div
                {...passProps}
                ref={ref}
                className='border-gray mx-auto mt-5 flex cursor-pointer rounded-lg border-b-[3px] border-l-2 border-r-2 border-t-[1px] px-1 py-[8px] duration-300  hover:border-default dark:border-white md:gap-5 md:px-[16p] lg:px-[32px]'
            >
                <PopupLocationDetails>
                    <MapIcon className='dark:invert' />
                </PopupLocationDetails>

                <div onClick={nextStep} className='flex w-full justify-between'>
                    <div className='details'>
                        <div className='address text-2xl font-medium dark:text-white'>{data.name}</div>

                        <div className='small-address text-lg font-medium dark:text-white'>{data.desc}</div>
                    </div>

                    <button className='flex items-center'>
                        <ArrowIcon className='dark:invert' />
                    </button>
                </div>
            </div>
        </>
    );
});
LocationCard.displayName = 'LocationCard';
export default LocationCard;
