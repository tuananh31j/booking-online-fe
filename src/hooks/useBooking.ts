import {
    backStep,
    chooseDate,
    chooseService,
    chooseStaff,
    chooseStore,
    nextStep,
    resetStep,
} from '~/store/slice/booking/booking.slice';
import { IDatePayload, IPlayloadServices } from '~/store/slice/booking/booking.slice.type';
import { useAppDispatch, useTypedSelector } from '~/store/store';
import { IStore } from '~/types/Store';

const useBooking = () => {
    const dispatch = useAppDispatch();
    const {
        booking: bookingInfo,
        currentStep,
        currentStoreInfo,
        progressObj,
        totalSeviceCompletionTime,
    } = useTypedSelector((state) => state.booking);
    const chooseStoreinfo = (store: IStore) => {
        dispatch(chooseStore(store));
    };
    const chooseStaffinfo = (id: number) => {
        dispatch(chooseStaff(id));
    };
    const chooseServiceinfo = (services: IPlayloadServices) => {
        dispatch(chooseService(services));
    };
    const chooseDateTime = (dateTime: IDatePayload) => {
        dispatch(chooseDate(dateTime));
    };
    const backToPrevStep = () => {
        dispatch(backStep());
    };
    const nextToStep = () => {
        dispatch(nextStep());
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
        nextToStep,
        resetStepBooking,
        bookingInfo,
        currentStep,
        currentStoreInfo,
        progressObj,
        totalSeviceCompletionTime,
    };
};

export default useBooking;
