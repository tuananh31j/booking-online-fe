import PopupModal from '~/components/_common/PopupModal';
import FormService from './FormService';
import PopupBackForm from '~/components/elements/PopupBackForm';
import { IService } from '~/types/Service';

interface ServiceItemProps {
    service: IService;
}

const ORDER_COLUMN_NAMES = ['ID', 'Name', 'Category', 'Description', 'Price', 'Created At', 'Updated At', 'Actions'];

const ServiceRow = (serviceProps: ServiceItemProps) => {
    const { service } = serviceProps;

    return (
        <tr className='h-10'>
            <td className='whitespace-nowrap border-b bg-transparent  align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {service.id}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {service.name}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {service.category}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {service.describe}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {service.price}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {service.created_at}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {service.updated_at}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent  align-middle capitalize shadow-transparent dark:border-white/40'>
                <PopupModal
                    btnName='Edit'
                    title="Change the service's information here"
                    className='underline hover:text-blue-800'
                    Form={FormService}
                ></PopupModal>
                |
                <PopupBackForm>
                    <button className='underline hover:text-red-800'>Delete</button>
                </PopupBackForm>
            </td>
        </tr>
    );
};

export { ServiceRow, ORDER_COLUMN_NAMES };
