import {
    backStep,
    chooseDate,
    chooseService,
    chooseStaff,
    chooseStore,
    getNameServices,
    nextStep,
    resetStep,
    setBooking,
} from '~/store/slice/booking/booking.slice';
import { IDatePayload, IPlayloadServices } from '~/store/slice/booking/booking.slice.type';
import { useAppDispatch, useTypedSelector } from '~/store/store';
import { IBookingResponse } from '~/types/Booking';
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
        booked,
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
    const submitconfirm = (booking: IBookingResponse) => {
        dispatch(setBooking(booking));
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
        submitconfirm,
        servicesName,
        bookingInfo,
        currentStep,
        currentStoreInfo,
        progressObj,
        booked,
    };
};

export default useBooking;
