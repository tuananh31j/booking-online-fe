export type IService = {
    id: number;
    categorie_id: number;
    name: string;
    describe: string;
    price: string;
    created_at: null;
    updated_at: null;
    category: null;
};

export type IGetServiceResponse = {
    data: IService[];
};
