import AdminNavbar from '~/components/Layouts/AdminNavbar';
import AdminSidebar from '~/components/Layouts/AdminSidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className='fixed bottom-0 left-0 right-0 top-0 -z-10 bg-[#5e72e4] transition-colors duration-300 dark:bg-[#051139]'></div>
            <AdminSidebar />
            <main className='relative h-full max-h-screen rounded-xl transition-all duration-200 ease-in-out xl:ml-[17rem]'>
                <AdminNavbar />
                {children}
            </main>
        </>
    );
};

export default AdminLayout;
