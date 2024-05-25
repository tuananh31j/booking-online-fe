import React from 'react';
import LoadingButton from '~/components/elements/LoadingButton';

const loading = () => {
    return (
        <div className='flex min-h-[100vh] min-w-[100vw] items-center justify-center'>
            <LoadingButton className='h-[220px] w-[220px]' />
        </div>
    );
};

export default loading;
