import React, { ReactNode } from 'react';
import ActionLink from '~/components/_common/ActionLink';

const MenuItem = ({ children, name, path }: { children: ReactNode; name: string; path: string }) => {
    return (
        <li className='mt-[0.125rem] w-full'>
            <ActionLink
                className={[
                    'ease-nav-brand mx-2 my-0 flex items-center whitespace-nowrap rounded-lg px-4 py-[0.625rem] text-sm font-semibold text-slate-700 transition-colors hover:bg-[#EAEDFC] dark:text-white dark:hover:text-green-950',
                    'bg-green-800',
                ]}
                to={path}
            >
                <div className='mr-1 flex  items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-[0.625rem]'>
                    {children}
                </div>
                <span className='ease pointer-events-none ml-1 opacity-100 duration-300'>{name}</span>
            </ActionLink>
        </li>
    );
};

export default MenuItem;
