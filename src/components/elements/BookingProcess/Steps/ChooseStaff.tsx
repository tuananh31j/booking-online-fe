import PopupStaffProfile from '../../PopupStaffProfile';
import StaffCard from '../../StaffCard';

const ChooseStaff = () => {
    return (
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
            <PopupStaffProfile>
                <StaffCard />
            </PopupStaffProfile>
            <PopupStaffProfile>
                <StaffCard />
            </PopupStaffProfile>
            <PopupStaffProfile>
                <StaffCard />
            </PopupStaffProfile>
            {/* <PopupStaffProfile>
                <StaffCard />
            </PopupStaffProfile> */}
        </div>
    );
};

export default ChooseStaff;
