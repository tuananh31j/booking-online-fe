export type ICategoryBody = {
    name: string;
};

export interface ICategoryResponse {
    data: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
    };
}

export interface ICategoryItem {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}
