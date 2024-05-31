import { FieldError } from 'react-hook-form';

const ShowValitaion = ({ errorField }: { errorField: FieldError | undefined }) => {
    return (
        <div className='h-4 text-red-600'>
            <span>{errorField && errorField.message}</span>
        </div>
    );
};

export default ShowValitaion;
