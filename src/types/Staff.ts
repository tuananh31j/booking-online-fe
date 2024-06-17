export type IStaff = {
    id: 1;
    email: string;
    email_verified_at: null | string;
    role: number;
    name: string;
    address: null | string;
    image: null | string;
    phone: null | string;
    created_at: string;
    updated_at: string;
};

export type IScheduleBody = {
    day: string;
    start_time: string;
    end_time: string;
};

export type ISchedulesRequestBody = {
    schedules: IScheduleBody[];
};
