import React, { ReactNode } from 'react';
import ActionLink from '~/components/_common/ActionLink';

const MenuItem = ({ children, name, path }: { children?: ReactNode; name: string; path: string }) => {
    return (
        <li className='mt-[0.125rem] w-full'>
            <ActionLink
                className={[
                    'ease-nav-brand mx-2 my-0 flex items-center whitespace-nowrap rounded-lg bg-card px-4 py-[0.625rem] text-sm  font-semibold text-foreground transition-colors hover:bg-opacity-10',
                    'bg-background text-foreground hover:bg-none',
                ]}
                to={path}
            >
                <p className='mr-1 flex  items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-[0.625rem]'>
                    {children}
                </p>
                <p className='ease pointer-events-none ml-1 opacity-100 duration-300'>{name}</p>
            </ActionLink>
        </li>
    );
};

export default MenuItem;
