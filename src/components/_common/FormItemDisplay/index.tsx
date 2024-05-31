import React, { forwardRef, useId } from 'react';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';

interface IInputProps extends React.HTMLProps<HTMLInputElement> {
    type: 'text' | 'password' | 'email' | 'date';
    title: string;
    description?: string;
    placeholder?: string;
    require?: boolean;
}

const FormItemDisplay = forwardRef<HTMLInputElement, IInputProps>(
    ({ type, title, placeholder, require, description, ...passProps }, ref) => {
        const inputId = useId();
        return (
            <FormItem className='mt-3 flex w-full flex-col gap-2'>
                <FormLabel>
                    {title}
                    {require && <span className='text-[#e41a0f]'>*</span>}
                </FormLabel>
                <FormControl>
                    <Input
                        {...passProps}
                        ref={ref}
                        placeholder={placeholder}
                        type={type}
                        id={inputId}
                        className='w-full rounded-[3px] border border-gray-500 p-2 focus:border-card'
                    ></Input>
                </FormControl>
                <FormDescription>{description}</FormDescription>
                <FormMessage />
            </FormItem>
        );
    }
);

FormItemDisplay.displayName = 'FormItemDisplay';

export default FormItemDisplay;
