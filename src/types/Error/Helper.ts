export interface CustomError {
    error: Record<string, string[]>;
    status_code: number;
}
export type ErrorFields = 'name' | 'address' | 'phone' | 'image';

// Hàm kiểm tra xem một giá trị có phải là một ErrorField hay không

export const isStoreError = (obj: any): obj is CustomError => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'error' in obj &&
        'status_code' in obj &&
        Array.isArray(obj.error.name)
    );
};
