/* eslint-disable no-unused-vars */
import ConfirmationForm from './Steps/ConfirmationForm';
import BookingCalendar from './Steps/BookingCalendar';
import ChooseLocation from './Steps/ChooseLocation';
import ChooseService from './Steps/ChooseService';
import ChooseStaff from './Steps/ChooseStaff';

const RenderStep = ({ step, action, handle }: { step: number; action: () => void; handle: (id: string) => void }) => {
    switch (step) {
        case 1:
            return <ChooseLocation nextStep={action} handleGetLocation={handle} />;
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
