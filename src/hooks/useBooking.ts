import { backStep, chooseDate, chooseService, chooseStaff, chooseStore, resetStep } from '~/store/slice/booking.slice';
import { useAppDispatch, useTypedSelector } from '~/store/store';
import { IDatePayload } from '~/types/Booking';
import { IStore } from '~/types/Store';

const useBooking = () => {
    const dispatch = useAppDispatch();
    const { booking: bookingInfo, currentStep, currentStoreInfo } = useTypedSelector((state) => state.booking);
    const chooseStoreinfo = (store: IStore) => {
        dispatch(chooseStore(store));
    };
    const chooseStaffinfo = (id: number) => {
        dispatch(chooseStaff(id));
    };
    const chooseServiceinfo = (arrService: { id: number }[]) => {
        dispatch(chooseService(arrService));
    };
    const chooseDateTime = (dateTime: IDatePayload) => {
        dispatch(chooseDate(dateTime));
    };
    const backToPrevStep = () => {
        dispatch(backStep());
    };
    const resetStepBooking = () => {
        dispatch(resetStep());
    };

    return {
        chooseStoreinfo,
        chooseStaffinfo,
        chooseServiceinfo,
        chooseDateTime,
        backToPrevStep,
        resetStepBooking,
        bookingInfo,
        currentStep,
        currentStoreInfo,
    };
};

export default useBooking;
