import { cn } from '~/lib/utils';
import PopupModal from '../PopupModal';
import { PlusIcon } from 'lucide-react';

const TitleDisplay = ({
    title,
    action,
}: {
    title: string;
    action?: { element: React.ElementType; modalTitle: string };
}) => {
    const Comq = action?.element;
    return (
        <div className={cn('mb-5 flex items-center justify-between border-b-[1.5px]')}>
            <div className='inline-block border-b-[1.5px] border-border py-[4px]  text-start md:border-b-[2.3px]'>
                <span className='flex items-center gap-3'>
                    <h1 className='text-start font-[400] capitalize md:text-[20px]'>{title}</h1>
                </span>
            </div>
            <div>
                {action && Comq && (
                    <PopupModal
                        className='h-10 w-10 p-2'
                        Form={Comq}
                        btnName={<PlusIcon />}
                        title={action.modalTitle}
                    />
                )}
            </div>
        </div>
    );
};

export default TitleDisplay;
