export type IScheduleResponse = {
    id: number;
    user_id: number;
    store_address: string;
    store_name: string;
    store_information_id: number;
    is_valid: number;
    day: string;
    start_time: string;
    end_time: string;
    created_at: string;
    error: string | null;
};
