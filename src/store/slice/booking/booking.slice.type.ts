import { Step } from '~/constants/enums';
import { IBooking } from '~/types/Booking';
import { IStore } from '~/types/Store';

export type IItemProgress = {
    active: boolean;
    title: string;
    last?: boolean;
};
export type IProgressObj = {
    store: IItemProgress;
    staff: IItemProgress;
    service: IItemProgress;
    date: IItemProgress;
    confirm: IItemProgress;
};
export type IDatePayload = { day: string; time: string };

export type IPlayloadServices = { services: number[] };

export type IInittialStateBooking = {
    booking: IBooking;
    servicesName: { id: number; name: string }[];
    progressObj: IProgressObj;
    currentStep: Step;
    currentStoreInfo: IStore | null;
};
export const initialState: IInittialStateBooking = {
    servicesName: [],
    progressObj: {
        store: {
            active: false,
            title: 'Store',
        },
        staff: {
            active: false,
            title: 'Staff',
        },
        service: {
            active: false,
            title: 'Service',
        },
        date: {
            active: false,
            title: 'Date',
        },
        confirm: {
            active: false,
            title: 'Confirm',
            last: true,
        },
    },
    currentStoreInfo: null,
    booking: {
        store: null,
        user: null,
        day: '',
        time: '',
        service_ids: [],
    },
    currentStep: Step.chooseStore,
};
