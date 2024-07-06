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
import { FC, useEffect, useState } from 'react';

type IPopupStoreDetailsProps = {
    children: React.ReactNode;
    name: string;
    address: string;
    location?: string;
    phone: string;
};

const PopupStoreDetails: FC<IPopupStoreDetailsProps> = ({ children, name, address, phone, location }) => {
    const t = useTranslations('Location');
    const [htmlContent, sethtml] = useState('');
    useEffect(() => {
        if (location) {
            sethtml(location);
        }
    }, [location]);
    return (
        <Dialog>
            <div className='hidden md:flex md:items-center'>
                <DialogTrigger>{children}</DialogTrigger>
            </div>

            <DialogContent className='min-w-[650px]'>
                <DialogHeader>
                    <DialogTitle>{t('title')}</DialogTitle>

                    <div className='flex flex-col items-center justify-center'>
                        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        {!location?.length && !location && (
                            <div className='flex h-[450px] w-[600px] items-center justify-center'>
                                <h3 className='text-xl font-medium'>Cửa hàng không có địa chỉ trên google maps</h3>
                            </div>
                        )}
                        <div className='details px-16 py-6 text-center text-2xl dark:text-white'>
                            <p className='address font-semibold'>{name}</p>
                            <p className='small-address text-lg font-medium'>{address}</p>
                            <p className='small-address text-lg font-medium'>{phone}</p>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default PopupStoreDetails;
