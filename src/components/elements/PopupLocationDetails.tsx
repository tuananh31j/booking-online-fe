import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog';
import mapImage from '~/assets/images/map.png';
import { useTranslations } from 'next-intl';

function PopupLocationDetails({ children }: { children: React.ReactNode }) {
    const t = useTranslations('Location');

    return (
        <Dialog>
            <div className='hidden md:flex md:items-center'>
                <DialogTrigger>{children}</DialogTrigger>
            </div>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('title')}</DialogTitle>

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

                            <div className='small-address text-lg font-medium'>62 Từ Hoa, Hanoi, Hanoi, 10000.</div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default PopupLocationDetails;
