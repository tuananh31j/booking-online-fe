'use client';

import Loading from '~/app/loading';
import Dashboard from '~/components/pages/Admins/Dashboard';

const DashboardPage = () => {
    if (typeof localStorage !== 'undefined') {
        return (
            <>
                <Dashboard />
            </>
        );
    }
    return <Loading />;
};

export default DashboardPage;
