import { FC } from 'react';
import { useForm } from 'react-hook-form';
import PopupModal from '~/components/_common/PopupModal';
import { Button } from '~/components/ui/button';

function ServiceForm({ onCloseModal }: { onCloseModal: () => void }) {
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
                <label htmlFor='name'>Service Name:</label>
                <input id='name' {...register('name', { required: true })} />
                {errors.name && <span>This field is required</span>}
            </div>

            <div>
                <label htmlFor='category'>Category:</label>
                <input id='category' {...register('category', { required: true })} />
                {errors.category && <span>This field is required</span>}
            </div>

            <div>
                <label htmlFor='description'>Description:</label>
                <textarea id='description' {...register('description', { required: true })} />
                {errors.description && <span>This field is required</span>}
            </div>

            <div>
                <label htmlFor='price'>Price:</label>
                <input id='price' type='text' {...register('price', { required: true })} />
                {errors.price && <span>This field is required</span>}
            </div>

            <button type='submit'>Update Service</button>
        </form>
    );
}

type IServiceRowProps = {
    id: string;
    name: string;
    category: string;
    description: string;
    price: string;
    createdAt: string;
    updatedAt: string;
};

const ORDER_COLUMN_NAMES = ['ID', 'Name', 'Category', 'Description', 'Price', 'Created At', 'Updated At', 'Actions'];

const ServiceRow: FC<IServiceRowProps> = ({ id, name, category, description, price, createdAt, updatedAt }) => {
    return (
        <tr>
            <td className='whitespace-nowrap border-b bg-transparent  align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {id}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {name}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {category}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {description}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {price}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {createdAt}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {updatedAt}
                </div>
            </td>

            <td className='whitespace-nowrap border-b bg-transparent  align-middle capitalize shadow-transparent dark:border-white/40'>
                <PopupModal
                    btnName='Edit'
                    title="Change the service's information here"
                    className='rounded-md bg-blue-500 px-4 py-2 text-sm text-white'
                    Form={ServiceForm}
                ></PopupModal>

                <Button className='ml-2 bg-red-500'>Delete</Button>
            </td>
        </tr>
    );
};

export { ServiceRow, ORDER_COLUMN_NAMES };
