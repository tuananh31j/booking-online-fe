import { BookingStatus } from '~/constants/enums';

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
    customer_name: string;
    customer_phone: string;
    customer_date: string;
    customer_note: string;
    customer_email: string;
    booking_status: BookingStatus;
};

export type IBooking = {
    store_id: number;
    user_id: number;
    day: string;
    time: string;
    service_ids: { id: number }[];
    customer_name: string;
    customer_date: string;
    customer_phone: string;
    customer_note: string;
    customer_email: string;
};
export type IDatePayload = { day: string; time: string };
