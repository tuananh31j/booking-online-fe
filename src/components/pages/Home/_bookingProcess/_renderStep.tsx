/* eslint-disable no-unused-vars */
import ConfirmationForm from './Steps/ConfirmationForm';
import BookingCalendar from './Steps/BookingCalendar';
import ChooseStore from './Steps/ChooseStore';
import ChooseService from './Steps/ChooseService';
import ChooseStaff from './Steps/ChooseStaff';

const RenderStep = ({ step }: { step: number }) => {
    switch (step) {
        case 1:
            return <ChooseStore />;
        case 2:
            return <ChooseStaff />;
        case 3:
            return <ChooseService />;
        case 4:
            return <BookingCalendar />;
        case 5:
            return <ConfirmationForm />;
        default:
            return <div>Unknown step</div>;
    }
};

export default RenderStep;
