import { Checkbox } from '~/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import ChatIcon from '~/components/_common/Icons/chatting/ChatIcon';
import { IService } from '~/types/Service';
import { FC } from 'react';

interface ServiceItemProps {
    service: Omit<IService, 'updated_at'>;
    handleRemove: () => void;
    handleSelect: () => void;
}

const ServiceCard: FC<ServiceItemProps> = ({ service, handleRemove, handleSelect }) => {
    return (
        <div className='mt-4 flex justify-between rounded-3xl border-2 hover:border-default'>
            <div className='service-content flex min-w-[500px]'>
                <div className='checkbox flex items-center md:px-3 lg:px-10'>
                    <Checkbox
                        onCheckedChange={(value) => {
                            if (value) {
                                handleSelect();
                            } else {
                                handleRemove();
                            }
                        }}
                    />
                </div>

                <Accordion type='single' collapsible className='w-full'>
                    <AccordionItem value='item-1'>
                        <AccordionTrigger>
                            <span>
                                <ChatIcon className='' />
                            </span>

                            <span className='mx-2 md:text-xl lg:text-2xl'>{service.name}</span>
                        </AccordionTrigger>

                        <AccordionContent className='md:text-lg lg:text-xl'>{service.describe}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className='service-time flex items-center md:px-5 md:text-lg lg:px-20 lg:text-xl'>
                <div>{service.time} minutes</div>
            </div>

            <div className='service-price flex items-center md:px-5 md:text-lg lg:px-20 lg:text-xl'>
                <div>{service.price}</div>
            </div>
        </div>
    );
};

export default ServiceCard;
