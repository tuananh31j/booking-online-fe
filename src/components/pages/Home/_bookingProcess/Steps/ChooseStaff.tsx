'use client';

import StaffCard from '~/components/elements/StaffCard';
import useBooking from '~/hooks/useBooking';
import { useGetListStaffClientQuery } from '~/store/services/staff.service';
import WrapperBooking from '../WrapperBooking';

const ChooseStaff = () => {
    const { bookingInfo, chooseStaffinfo } = useBooking();
    const { data, isLoading } = useGetListStaffClientQuery(bookingInfo.store_id);

    console.log(data);
    return (
        <WrapperBooking stepKeyTranslation='step_staff' isLoading={isLoading}>
            <div className='grid grid-cols-1 justify-between sm:grid-cols-2 md:grid-cols-4'>
                {data &&
                    data.data.data.map((item, index: number) => (
                        <StaffCard key={index} staff={item} handleGetStaff={() => chooseStaffinfo(item.id)} />
                    ))}
            </div>
        </WrapperBooking>
    );
};

export default ChooseStaff;
