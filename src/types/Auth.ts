export type ILoginBody = {
    email: string;
    password: string;
};

export type ILoginData = {
    id: number;
    email: string;
    email_verified_at: null | string;
    role: number;
    name: string;
    address?: null | string;
    image?: null | string;
    phone?: null | string;
    created_at: string;
    updated_at: string;
};

export type ILoginResponse = {
    data: ILoginData;
    token: string;
};
