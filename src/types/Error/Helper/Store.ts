export type ErrorFields = 'name' | 'address' | 'phone' | 'image';
interface StoreError {
    status?: number; // Status không bắt buộc nữa
    data?: {
        error: Record<ErrorFields, string[]>;
    };
}
interface StoreErrorWithData extends StoreError {
    data: {
        error: Record<ErrorFields, string[]>;
    };
}

// Hàm kiểm tra xem một giá trị có phải là một ErrorField hay không

export const isStoreError = (error: any): error is StoreErrorWithData => {
    return error && error.data && 'error' in error.data;
};
