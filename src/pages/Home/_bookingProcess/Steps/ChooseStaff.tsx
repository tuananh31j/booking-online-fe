import StaffCard from '~/components/elements/StaffCard';
import { useListStaffClientQuery } from '~/store/services/staff.service';

const ChooseStaff = () => {
    const { data } = useListStaffClientQuery();
    return (
        <div className='grid grid-cols-1 justify-between sm:grid-cols-2 md:grid-cols-4'>
            {data && data.data && data?.data.data.map((item, index: number) => <StaffCard key={index} staff={item} />)}
        </div>
    );
};

export default ChooseStaff;
