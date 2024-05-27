import { Checkbox } from '~/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import ChatIcon from '~/components/_common/Icons/chatting/ChatIcon';

const ServiceCard = () => {
    return (
        <div className='mt-4 flex rounded-3xl border-2 hover:border-default'>
            <div className='checkbox flex items-center md:px-3 lg:px-10'>
                <Checkbox />
            </div>

            <div className='service-content md:px-5 lg:px-16'>
                <Accordion type='single' collapsible className='w-full'>
                    <AccordionItem value='item-1'>
                        <AccordionTrigger>
                            <span>
                                <ChatIcon className='' />
                            </span>

                            <span className='mx-2 md:text-xl lg:text-2xl'>Nail care (Nail Care)</span>
                        </AccordionTrigger>

                        <AccordionContent className='md:text-lg lg:text-xl'>
                            Do you want to have a manicure or pedicare? <br />
                            Please leave a note for us for better service.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className='service-time flex items-center md:px-5 md:text-lg lg:px-20 lg:text-xl'>
                <div>1 hour 30 minutes</div>
            </div>

            <div className='service-price flex items-center md:px-5 md:text-lg lg:px-20 lg:text-xl'>
                <div>From 0 USD</div>
            </div>
        </div>
    );
};

export default ServiceCard;
