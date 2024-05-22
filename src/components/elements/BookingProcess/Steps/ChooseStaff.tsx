import StaffCard from '~/components/elements/StaffCard';

const ChooseStaff = () => {
    return (
        <div className='grid grid-cols-1 justify-between sm:grid-cols-2 md:grid-cols-4'>
            <StaffCard />
            <StaffCard />
            <StaffCard />
            <StaffCard />
        </div>
    );
};

export default ChooseStaff;
