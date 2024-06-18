export type IOpeningBody = {
    data: {
        opening_hours: {
            day: string;
            opening_time: string;
            closing_time: string;
        };
    };
};

export type IOpeningResponse = {
    data: {
        id: number;
        store_information_id: number;
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

export type IOpeningByIdStoreResponse = {
    data: {
        day: string;
        opening_time: string;
        closing_time: string;
    };
};

export interface IOpeningItem {
    id: number;
    store_information_id: number;
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
