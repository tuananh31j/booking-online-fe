import exp from 'constants';
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

export type IPlayloadServices = { services: number[]; totalTime: number };

export type IInittialStateBooking = {
    booking: IBooking;
    progressObj: IProgressObj;
    currentStep: Step;
    currentStoreInfo: IStore | null;
    totalSeviceCompletionTime: number;
};
export const initialState: IInittialStateBooking = {
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
    totalSeviceCompletionTime: 0,
    booking: {
        store_id: 0,
        user_id: 0,
        day: '',
        time: '',
        service_ids: [],
        customer_name: '',
        customer_date: '',
        customer_phone: '',
        customer_note: '',
        customer_email: '',
    },
    currentStep: Step.chooseStore,
};
