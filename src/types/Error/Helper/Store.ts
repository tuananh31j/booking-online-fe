export type ErrorFields = 'name' | 'address' | 'phone' | 'image';
export type CategoryErrorField = 'name';
interface StoreError {
    status?: number; // Status không bắt buộc nữa
    data?: {
        error: Record<ErrorFields, string[]>;
    };
}
interface CategoryError {
    status?: number; // Status không bắt buộc nữa
    data?: {
        error: Record<CategoryErrorField, string[]>;
    };
}
interface StoreErrorWithData extends StoreError {
    data: {
        error: Record<ErrorFields, string[]>;
    };
}
interface CategoryErrorWithData extends CategoryError {
    data: {
        error: Record<CategoryErrorField, string[]>;
    };
}

// Hàm kiểm tra xem một giá trị có phải là một ErrorField hay không

export const isStoreError = (error: any): error is StoreErrorWithData => {
    return error && error.data && 'error' in error.data;
};

export const isCategoryError = (error: any): error is CategoryErrorWithData => {
    return error && error.data && 'error' in error.data;
};
