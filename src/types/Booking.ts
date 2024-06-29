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
    customer_name: string;
    customer_date: string;
    customer_phone: string;
    customer_note?: string;
    customer_email: string;
};
export type IBookingPayload = {
    customer_name: string;
    customer_date: string;
    customer_phone: string;
    customer_note?: string;
    customer_email: string;
    user_id: number;
    time: string;
    service_ids: number[];
    day: string;
};

export type IBookingResponse = {
    data: {
        store_name: string;
        store_address: string;
        staff_name: string;
        staff_id: number;
        staff_phone: string;
        staff_email: string;
        staff_address: string;
        services: Array<{
            id: number;
            name: string;
            price: string;
            time: number;
        }>;
        total_time: number;
        total_price: number;
        time_order: string;
        date_order: string;
        customer_name: string;
        customer_phone: string;
        customer_date: string;
        customer_note: string;
        customer_email: string;
    };
};
