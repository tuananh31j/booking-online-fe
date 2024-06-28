import { IStore } from './Store';
import { IStaff } from './Staff';

export type IBookingTest = {
    store_name: string;
    store_address: string;
    staff_name: string;
    staff_id: string;
    staff_phone: string;
    staff_date: string;
    staff_address: string;
    service_id: string;
    time_order: string;
    date_order: string;
};

export type IBooking = {
    store: IStore | null;
    user: IStaff | null;
    day: string;
    time: string;
    service_ids: number[];
};
