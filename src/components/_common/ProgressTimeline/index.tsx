import { FC } from 'react';
import ItemLine from './ItemLine';
import { IProgressObj } from '~/store/slice/booking/booking.slice.type';
import { useTranslations } from 'next-intl';

type IProgressTimeline = {
    progressObj: IProgressObj;
};

const ProgressTimeline: FC<IProgressTimeline> = ({ progressObj }) => {
    const t = useTranslations('StepBooking.Timeline');

    return (
        <div className='mx-10 flex items-center'>
            {Object.keys(progressObj).map((item, i) => {
                const key = item as keyof IProgressObj;
                if (progressObj[key].last) {
                    return <ItemLine last key={i} active={progressObj[key].active} title={t(progressObj[key].title)} />;
                }
                return <ItemLine key={i} active={progressObj[key].active} title={t(progressObj[key].title)} />;
            })}
        </div>
    );
};

export default ProgressTimeline;
