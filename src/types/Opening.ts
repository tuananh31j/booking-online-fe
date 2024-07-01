export type IOpeningBody = {
    opening_hours: Array<{
        day: string;
        opening_time: string;
        closing_time: string;
    }>;
};

export type IOpeningResponse = {
    data: {
        id: number;
        store_id: number;
        day: string;
        opening_time: string;
        closing_time: string;
        created_at: string;
        updated_at: string;
        store_information: {
            id: number;
            name: string;
            address: string;
        };
    };
};
export type IQuickCreateData = {
    start_date: string;
    closing_time: string;
    opening_time: string;
};

export type IOpeningByIdStoreResponse = {
    id: number;
    day: string;
    opening_time: string;
    closing_time: string;
};

export interface IOpeningItem {
    id: number;
    store_id: number;
    day: string;
    opening_time: string;
    closing_time: string;
    created_at: string;
    updated_at: string;
    store_information: {
        id: number;
        name: string;
        address: string;
    };
}
