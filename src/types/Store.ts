export type IStoreBody = {
    name: string;
    address: string;
    phone: string;
    image?: File | string | FileList;
};

export type IStoreWorkingTimeResponse = {
    data: {
        day: string;
        start_time: string;
        end_time: string;
    };
};

export type IStoreResponse = {
    data: {
        id: number;
        name: string;
        address: string;
        phone: string;
        image: string;
        updated_at: string;
        created_at: string;
    };
};

export interface IStoreItem {
    id: number;
    name: string;
    address: string;
    phone: string;
    image: string;
    created_at: string;
    updated_at: string;
}

// commit failed state
