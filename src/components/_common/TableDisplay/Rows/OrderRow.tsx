import { FC } from 'react';
import ActionLink from '~/components/_common/ActionLink';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog';

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
                <p className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {facility}
                </p>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <p className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {service}
                </p>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <p className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {date}
                </p>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <p className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {time}
                </p>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <p className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {employee}
                </p>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <Dialog>
                    <DialogTrigger>
                        <p className='mb-0 text-xs font-semibold capitalize leading-tight underline dark:text-white dark:opacity-80'>
                            {booker}
                        </p>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Booker&apos;s details</DialogTitle>

                            <DialogDescription>
                                <p className='text-sm font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                                    Name: {booker}
                                </p>
                                <p className='text-sm font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                                    Phone: 0123456789
                                </p>

                                <p className='text-sm font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                                    Address: 123 Example St, Example City
                                </p>

                                <p className='text-sm font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                                    Email: {booker.toLowerCase().replace(' ', '.')}@example.com
                                </p>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <ActionLink
                    to='/'
                    className={[
                        'text-xs font-semibold capitalize leading-tight text-slate-400 dark:text-white dark:opacity-80',
                        'm-1 bg-black',
                    ]}
                >
                    Edit
                </ActionLink>
            </td>
        </tr>
    );
};

export { OrderRow, ORDER_COLUMN_NAMES };
