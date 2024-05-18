import { BookingCalendar, BookingForm, ChooseLocation, ChooseService, ChooseStaff } from './Steps';

const RenderStep = ({ step }: { step: number }) => {
    switch (step) {
        case 1:
            return <ChooseLocation />;
        case 2:
            return <ChooseStaff />;
        case 3:
            return <ChooseService />;
        case 4:
            return <BookingCalendar />;
        case 5:
            return <BookingForm />;
        default:
            return <div>Unknown step</div>;
    }
};

export default RenderStep;
