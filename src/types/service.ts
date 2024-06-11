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

export interface IServiceItem {
    id: number;
    name: string;
    categorie_id: number;
    describe: string;
    price: string;
    created_at: string;
    updated_at: string;
}
