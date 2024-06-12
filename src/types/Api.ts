export type IApiResponse<T> = {
    error: any;
    message: string;
    data: T;
};
