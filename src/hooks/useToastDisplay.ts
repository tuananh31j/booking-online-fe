'use client';

import { useToast } from '~/components/ui/use-toast';

export default function useToastDisplay() {
    const { toast } = useToast();
    return ({
        title,
        description,
        status,
    }: {
        title: string;
        description?: string;
        status?: 'default' | 'success' | 'destructive';
    }) =>
        toast({
            variant: status,
            title,
            description,
            icon: status,
        });
}
