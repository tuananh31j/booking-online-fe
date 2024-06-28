import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import React from 'react';
import { useTranslations } from 'next-intl';

type IAlerdialogProps = {
    children: React.ReactNode;
    handleConfirm?: (id: number) => void;
    content: {
        idContent: number;
        title: string;
        description: string;
    };
    type?: 'button' | 'none';
};

export default function AlertDialogConfirm({ children, handleConfirm, content, type }: IAlerdialogProps) {
    const t = useTranslations('Table');
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger
                    className={`${type === 'button' && 'flex h-[36px] w-[48px] items-center justify-center rounded-sm bg-primary text-reverse'}`}
                >
                    {children}
                </AlertDialogTrigger>
                <AlertDialogContent className='w-[90%] rounded-lg px-2 duration-500'>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='flex justify-center'>
                            <svg
                                className='svg-icon w-[130px] fill-yellow-500 md:w-[230px]'
                                viewBox='0 0 1024 1024'
                                version='1.1'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M512 955.733333c-121.890133 0-227.584-43.8784-314.146133-130.440533C111.872 739.2768 68.266667 633.890133 68.266667 512c0-121.856 43.588267-227.549867 129.536-314.112C284.450133 111.854933 390.144 68.266667 512 68.266667c121.890133 0 227.2768 43.605333 313.2928 129.5872C911.854933 284.416 955.733333 390.109867 955.733333 512c0 121.924267-43.895467 227.328-130.474666 313.326933C739.328 911.837867 633.924267 955.733333 512 955.733333z m0-853.333333c-112.520533 0-210.1248 40.2432-290.065067 119.620267C142.6432 301.8752 102.4 399.479467 102.4 512c0 112.503467 40.226133 209.783467 119.586133 289.160533C301.909333 881.083733 399.496533 921.6 512 921.6c112.4864 0 209.7664-40.4992 289.1264-120.405333C881.1008 721.7664 921.6 624.4864 921.6 512c0-112.503467-40.516267-210.090667-120.439467-290.013867C721.783467 142.626133 624.503467 102.4 512 102.4z' />
                                <path d='M512 734.72a34.133333 34.133333 0 0 1-34.133333-34.133333V624.64a34.133333 34.133333 0 0 1 68.266666 0v75.946667a34.133333 34.133333 0 0 1-34.133333 34.133333z m0-218.453333a34.133333 34.133333 0 0 1-34.133333-34.133334v-158.72a34.133333 34.133333 0 0 1 68.266666 0v158.72a34.133333 34.133333 0 0 1-34.133333 34.133334z' />
                            </svg>
                        </AlertDialogTitle>
                        <p className='text-center text-default md:text-4xl'>{content.title}</p>
                        <p className='text-center text-sm text-[#7777] md:text-sm'>{content.description}</p>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        {handleConfirm && (
                            <>
                                <AlertDialogCancel className='bg-card'>{t('Store.confirm.no')}</AlertDialogCancel>
                                <AlertDialogAction
                                    className='bg-red-500'
                                    onClick={() => handleConfirm(content.idContent)}
                                >
                                    {t('Store.confirm.yes')}
                                </AlertDialogAction>
                            </>
                        )}
                        {!handleConfirm && <AlertDialogCancel className='bg-red-500'>Được thôi</AlertDialogCancel>}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
