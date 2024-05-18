import PopupStaffProfile from '../../PopupStaffProfile';
import StaffCard from '../../StaffCard';

const ChooseStaff = () => {
    return (
        <div className='grid grid-cols-4 gap-8'>
            <PopupStaffProfile>
                <StaffCard />
            </PopupStaffProfile>
            <PopupStaffProfile>
                <StaffCard />
            </PopupStaffProfile>
            <PopupStaffProfile>
                <StaffCard />
            </PopupStaffProfile>
            <PopupStaffProfile>
                <StaffCard />
            </PopupStaffProfile>
        </div>
    );
};

export default ChooseStaff;
