import {
    backStep,
    chooseDate,
    chooseService,
    chooseStaff,
    chooseStore,
    getNameServices,
    nextStep,
    resetStep,
} from '~/store/slice/booking/booking.slice';
import { IDatePayload, IPlayloadServices } from '~/store/slice/booking/booking.slice.type';
import { useAppDispatch, useTypedSelector } from '~/store/store';
import { IStaff } from '~/types/Staff';
import { IStore } from '~/types/Store';

const useBooking = () => {
    const dispatch = useAppDispatch();
    const {
        booking: bookingInfo,
        currentStep,
        currentStoreInfo,
        progressObj,
        servicesName,
    } = useTypedSelector((state) => state.booking);
    const chooseStoreinfo = (store: IStore) => {
        dispatch(chooseStore(store));
    };
    const chooseStaffinfo = (staff: IStaff) => {
        dispatch(chooseStaff(staff));
    };
    const chooseServiceinfo = (services: IPlayloadServices) => {
        dispatch(chooseService(services));
    };
    const selectServicesName = (services: { id: number; name: string }[]) => {
        dispatch(getNameServices(services));
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
        selectServicesName,
        servicesName,
        bookingInfo,
        currentStep,
        currentStoreInfo,
        progressObj,
    };
};

export default useBooking;
