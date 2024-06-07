export type IStoreBody = {
    name: string;
    address: string;
    phone: string;
    image?: File | string | FileList;
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
