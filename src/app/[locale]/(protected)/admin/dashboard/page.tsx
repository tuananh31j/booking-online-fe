'use client';

import Dashboard from '~/components/Pages/Admins/Dashboard';
import { Button } from '~/components/ui/button';
import useToastDisplay from '~/hooks/useToastDisplay';

const DashboardPage = () => {
    const toast = useToastDisplay();
    return (
        <>
            <Button
                onClick={() =>
                    toast({
                        title: 'Add staff success',
                        status: 'success',
                        description: 'Staff Name: Lương Chính Quốc',
                    })
                }
            >
                Onclick
            </Button>
            <Button
                onClick={() =>
                    toast({ title: 'New booking', status: 'default', description: 'Staff name: Lương Chính Quốc' })
                }
            >
                Onclick
            </Button>
            <Button
                onClick={() =>
                    toast({
                        title: 'Edit profile staff error',
                        status: 'destructive',
                        description: 'If you change profile staff you need complete form',
                    })
                }
            >
                Onclick
            </Button>
            <Dashboard />
        </>
    );
};

export default DashboardPage;
