import { FC } from 'react';
import { useForm } from 'react-hook-form';
import PopupModal from '~/components/_common/PopupModal';

function UserForm({ onCloseModal }: { onCloseModal: () => void }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = () => {
        onCloseModal();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='name'>Name:</label>
                <input id='name' {...register('name', { required: true })} />
                {errors.name && <span>This field is required</span>}
            </div>
            <div>
                <label htmlFor='email'>Email:</label>
                <input id='email' type='email' {...register('email', { required: true })} />
                {errors.email && <span>This field is required</span>}
            </div>
            <button type='submit'>Submit</button>
        </form>
    );
}

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
                    className='mb-0 text-xs font-semibold capitalize leading-tight underline dark:text-white dark:opacity-80'
                >
                    <div className='text-sm font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                        Name: {booker}
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
                <PopupModal
                    btnName='Edit'
                    title="Change the order's information here"
                    className='rounded-md bg-blue-500 px-4 py-2 text-sm text-white'
                    Form={UserForm}
                ></PopupModal>
            </td>
        </tr>
    );
};

export { OrderRow, ORDER_COLUMN_NAMES };
