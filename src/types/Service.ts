export type IService = {
    id: number;
    categorie_id: number;
    name: string;
    describe: string;
    price: string;
    created_at: string;
    updated_at: string;
    time: number;
    category: null;
};

export type IGetServiceResponse = {
    data: IService[];
};
export type IServiceBody = {
    name: string;
    categorie_id: number;
    price: string;
    describe: string;
};

export type IServiceResponse = {
    data: {
        id: number;
        name: string;
        categorie_id: number;
        describe: string;
        price: string;
        created_at: string;
        updated_at: string;
    };
};
