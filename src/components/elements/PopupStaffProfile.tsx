import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { IStaff } from '~/types/Staff';

export interface IProps {
    children: React.ReactNode;
    staff: IStaff;
}

const PopupStaffProfile = (props: IProps) => {
    const t = useTranslations('StaffInformation');

    return (
        <>
            <Dialog>
                <DialogTrigger className='w-full'>{props.children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <div className='da pl-2 text-2xl font-normal dark:text-white'>{t('title')}</div>
                        </DialogTitle>
                        <div className='flex space-x-5 p-5'>
                            <Image
                                src={props.staff.image || 'https://i.redd.it/030mmgcrecta1.png'}
                                alt='avatar'
                                className='h-48 w-48 object-cover shadow-lg '
                                width={180}
                                height={180}
                                quality={100}
                            />
                            <div className='space-y-2 text-lg dark:text-white'>
                                <p className='mb-2'>
                                    <strong>{t('name')}:</strong> {props.staff.name}
                                </p>
                                <p className='mb-2'>
                                    <strong>{t('age')}:</strong> 28
                                </p>
                                <p className='mb-2'>
                                    <strong>{t('country')}:</strong> {props.staff.address || '--'}{' '}
                                </p>
                                <p className='mb-2'>
                                    <strong>{t('phone')}:</strong> {props.staff.phone || '--'}
                                </p>
                            </div>
                        </div>
                        {/* <div className='mt-4 px-4 text-base dark:text-white'>
                            <p className='mb-2 '>
                                <strong>{t('exp')}:</strong> Skilled short hair stylist ensures confidence and style for
                                clients.
                            </p>
                            <p className=''>
                                <strong>{t('desc')}:</strong> Expert short hair stylist delivers confidence and style
                                with precise cuts and personalized service, crafting trendy looks tailored to each
                                clients features and preferences
                            </p>
                        </div> */}
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};
export default PopupStaffProfile;
