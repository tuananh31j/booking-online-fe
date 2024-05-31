'use client';

import React, { forwardRef } from 'react';

type IButtonSubmit = React.HTMLProps<HTMLButtonElement> & { isSubmitting?: boolean; name: string };

const ButtonSubmit = forwardRef<HTMLButtonElement, IButtonSubmit>(({ isSubmitting, name, ...passProps }, ref) => {
    return (
        <button
            {...passProps}
            ref={ref}
            type='submit'
            disabled={isSubmitting}
            className='mt-3 flex h-14 w-full flex-col items-center justify-center rounded-md border-transparent bg-card p-3 text-foreground'
        >
            {isSubmitting ? (
                <span className='inline-block h-7 w-7 animate-spin rounded-full  border-4 border-dotted border-white'></span>
            ) : (
                <span className=' inline-block'>{name}</span>
            )}
        </button>
    );
});

ButtonSubmit.displayName = 'ButtonSubmit';

export default ButtonSubmit;
