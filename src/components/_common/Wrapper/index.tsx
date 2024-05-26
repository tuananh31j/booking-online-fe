import React, { FC, ReactNode } from 'react';
import TitleDisplay from '~/components/_common/TitleDisplay';

type IWrapperProps = {
    children: ReactNode;
    title: string;
};

const Wrapper: FC<IWrapperProps> = ({ children, title }) => {
    return (
        <div className='m-3 flex flex-wrap'>
            <div className='w-full max-w-full flex-none px-3'>
                <div className='relative flex min-w-0 flex-col break-words rounded-lg border-0 border-solid border-transparent bg-white bg-clip-border p-3 shadow-xl dark:bg-gray-900 dark:shadow-lg'>
                    <TitleDisplay title={title} />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Wrapper;
