import AdminNavbar from '~/components/layouts/AdminNavbar';
import AdminSidebar from '~/components/layouts/AdminSidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AdminSidebar />
            <main className='relative mt-4 h-full max-h-screen rounded-xl transition-all duration-200 ease-in-out xl:ml-[17rem]'>
                <AdminNavbar />
                <div className='m-6'>{children}</div>
            </main>
        </>
    );
};

export default AdminLayout;
