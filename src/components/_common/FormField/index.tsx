import React, { forwardRef, useId } from 'react';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

interface IInputProps extends React.HTMLProps<HTMLInputElement> {
    type: 'text' | 'password' | 'email' | 'date';
    title: string;
    placeholder?: string;
    require?: boolean;
}

const FormField = forwardRef<HTMLInputElement, IInputProps>(
    ({ type, title, placeholder, require, ...passProps }, ref) => {
        const inputId = useId();
        return (
            <div className='mt-3 flex w-full flex-col gap-2'>
                <Label className='text-base' htmlFor={inputId}>
                    {title}
                    {require && <span className='text-[#e41a0f]'>*</span>}
                </Label>
                <Input
                    {...passProps}
                    ref={ref}
                    placeholder={placeholder}
                    type={type}
                    id={inputId}
                    className='w-full rounded-[3px] border border-gray-500 p-2 focus:border-card'
                ></Input>
            </div>
        );
    }
);

FormField.displayName = 'FormField';

export default FormField;
