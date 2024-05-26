import AdminNavbar from '~/components/Layouts/AdminNavbar';
import AdminSidebar from '~/components/Layouts/AdminSidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AdminSidebar />
            <main className='relative h-full max-h-screen rounded-xl transition-all duration-200 ease-in-out xl:ml-[17rem]'>
                <AdminNavbar />
                <div className='mx-6'>{children}</div>
            </main>
        </>
    );
};

export default AdminLayout;
