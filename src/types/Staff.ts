export type IStaff = {
    id: 1;
    email: string;
    email_verified_at: null | string;
    role: number;
    name: string;
    address: null | string;
    store_information_id: number;
    password?: string;
    image: string;
    phone: null | string;
    created_at: string;
    updated_at: string;
};
export type IStaffResponse = {
    id?: number;
    name: string;
    email: string;
    password: string;
    address: string;
    store_information_id: number;
    phone: string;
    image: string;
    role: number;
    updated_at: string;
    created_at: string;
};
