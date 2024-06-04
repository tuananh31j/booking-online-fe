'use client';

import { CircleAlert, CircleCheck, MessageCircle } from 'lucide-react';
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '~/components/ui/toast';
import { useToast } from '~/components/ui/use-toast';

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(function ({ icon, id, title, description, action, ...props }) {
                return (
                    <Toast key={id} {...props}>
                        <div className='flex items-center gap-5'>
                            {icon === 'success' && <CircleCheck className='h-10 w-10 text-green-700' />}
                            {icon === 'destructive' && <CircleAlert className='h-10 w-10 text-red-500' />}
                            {icon === 'default' && <MessageCircle className='h-10 w-10' />}
                            <div className='grid-1'>
                                {title && <ToastTitle>{title}</ToastTitle>}
                                {description && <ToastDescription>{description}</ToastDescription>}
                            </div>
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}
