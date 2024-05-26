/* eslint-disable no-unused-vars */
import { BookingCalendar, ConfirmationForm, ChooseLocation, ChooseService, ChooseStaff } from './Steps';

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
