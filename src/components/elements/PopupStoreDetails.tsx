import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog';
import { useTranslations } from 'next-intl';
import MapDisplay from '~/components/ui/Map';
import { FC } from 'react';

type IPopupStoreDetailsProps = {
    children: React.ReactNode;
    name: string;
    address: string;
    phone: string;
};

const PopupStoreDetails: FC<IPopupStoreDetailsProps> = ({ children, name, address, phone }) => {
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
                        <MapDisplay />
                        <div className='details px-16 py-6 text-center text-2xl dark:text-white'>
                            <p className='address font-semibold'>{name}</p>
                            <p className='small-address text-lg font-medium'>{address}</p>
                            <p className='small-address text-lg font-medium'>{phone}</p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default PopupStoreDetails;
