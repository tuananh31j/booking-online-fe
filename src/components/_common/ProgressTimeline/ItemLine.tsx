import { useTranslations } from 'next-intl';
import { Progress } from '~/components/ui/progress';
import { cn } from '~/lib/utils';

const Checkponit = ({ active, title }: { active: boolean; title: string }) => {
    return (
        <div
            className={cn('relative z-50 -ml-3 h-5 w-5 rounded-full border border-transparent', {
                ['bg-default']: !active,
                ['bg-pink-700 ']: active,
            })}
        >
            <span className='absolute top-7 w-[100px] -translate-x-[40%] text-center'>{title}</span>
        </div>
    );
};

const ItemLine = ({ active, last, title }: { active: boolean; last?: boolean; title: string }) => {
    const t = useTranslations('StepBooking');

    return (
        <div className='relative flex w-full items-center justify-center'>
            <Checkponit active={active} title={title} />
            <Progress value={active ? 100 : 0} className='-ml-3 bg-default' />
            {last && <Checkponit active={active} title={t('Timeline.Done')} />}
        </div>
    );
};

export default ItemLine;
