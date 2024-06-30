export interface IOderResponse {
    booking_id: number;
    created_at: string;
    date: string;
    email: string;
    id: number;
    name: string;
    note: string;
    phone: string;
    staff_name: string;
    status: string;
    store_name: string;
    total_price: string;
    updated_at: string;
}

export interface IStaffOderResponse {
    day: string;
    id: number;
    status: string;
    store_address: string;
    store_name: string;
    time: string;
}
