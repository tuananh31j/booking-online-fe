export type IStaff = {
    id: number;
    email: string;
    email_verified_at: null | string;
    role: number;
    name: string;
    address: null | string;
    store_id: number;
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
    store_id: number;
    phone: string;
    image: string;
    role: number;
    updated_at: string;
    created_at: string;
};
export type IScheduleBody = {
    day: string;
    start_time: string;
    end_time: string;
};

export type ISchedulesRequestBody = {
    schedules: IScheduleBody[];
};
export type IWorkDate = {
    day: string;
    start_time: string;
    end_time: string;
    created_at: Date;
};
export type IListSchedulesStaff = {
    data: {
        store_id: number;
        store_name: string;
        schedules: IWorkDate[];
    };
};
export type IListTimeStaff = {
    data: {
        working_time_slots: string[];
        booked_time_slots: string[];
        available_time_slots: string[];
    };
};
export type IOpeningHoursResponse = {
    day: string;
    opening_time: string;
    closing_time: string;
};
