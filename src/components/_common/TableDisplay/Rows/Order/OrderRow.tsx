import { FC } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import FormOrder from './FormOrder';

type IOrderRowProps = {
    facility: string;
    service: string;
    date: string;
    time: string;
    employee: string;
    booker: string;
};

const ORDER_COLUMN_NAMES = ['Facility', 'Service', 'Date', 'Time', 'Employee', 'Booker', 'Actions'];

const OrderRow: FC<IOrderRowProps> = ({ facility, service, date, time, employee, booker }) => {
    return (
        <tr>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {facility}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {service}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {date}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {time}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {employee}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <PopupModal
                    btnName={booker}
                    title="Booker's details"
                    className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'
                >
                    <div className='text-sm font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                        Name: {booker} br
                    </div>

                    <div className='text-sm font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                        Phone: 0123456789
                    </div>

                    <div className='text-sm font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                        Address: 123 Example St, Example City
                    </div>

                    <div className='text-sm font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                        Email: {booker.toLowerCase().replace(' ', '.')}@example.com
                    </div>
                </PopupModal>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <PopupModal btnName='Edit' title="Change the order's information here" Form={FormOrder}></PopupModal>
            </td>
        </tr>
    );
};

export { OrderRow, ORDER_COLUMN_NAMES };
