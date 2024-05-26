import { cn } from '~/lib/utils';

const TitleDisplay = ({ title }: { title: string }) => {
    return (
        <div className={cn('mb-5 flex items-center justify-between border-b-[1.5px]')}>
            <div className='inline-block border-b-[1.5px] border-border py-[4px]  text-start md:border-b-[2.3px]'>
                <span className='flex items-center gap-3'>
                    <h1 className='text-start font-[400] capitalize md:text-[20px]'>{title}</h1>
                </span>
            </div>
        </div>
    );
};

export default TitleDisplay;
