export interface IUserResponse {
    id: number;
    email: string;
    name: string;
    image: string;
    address: string;
    phone: string;
    store_id: string;
    created_at: string;
}

export interface IFormProfileBody {
    name?: string;
    phone?: string;
    address?: string;
    image?: string | undefined;
    current_password: string;
}
