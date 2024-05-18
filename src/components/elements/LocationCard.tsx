import React from 'react';
import ArrowIcon from '~/components/_icons/arrow/Arrow';
import MapIcon from '~/components/_icons/map/Map';
import mapImage from '~/assets/images/map.png';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog';
import Image from 'next/image';

const LocationCard = () => {
    return (
        <>
            <div className='border-gray mx-auto mt-5 flex rounded-lg border-b-[3px] border-l-2 border-r-2 px-1 py-[8px] hover:border-t-[1px] hover:border-pink-300 dark:border-white md:gap-5 md:px-[16p] lg:px-[32px]'>
                <Dialog>
                    <div className='hidden md:flex md:items-center'>
                        <DialogTrigger>
                            <MapIcon className='dark:invert' />
                        </DialogTrigger>
                    </div>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>You can find us here</DialogTitle>

                            <DialogDescription>
                                <Image
                                    src={mapImage.src}
                                    alt='map-img'
                                    width={mapImage.width}
                                    height={mapImage.height}
                                    quality={100}
                                    className='w-full'
                                />

                                <div className='details px-16 py-6 text-center text-2xl dark:text-white'>
                                    <div className='address font-semibold'>
                                        Nailkitchen 1 - 62 Tu Hoa, Tay Ho (Westlake Area - near Sheraton Hotel)
                                    </div>

                                    <div className='small-address text-lg font-medium'>
                                        62 Từ Hoa, Hanoi, Hanoi, 10000.
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

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
