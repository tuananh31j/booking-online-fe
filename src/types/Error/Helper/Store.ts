export type ErrorFields = 'name' | 'address' | 'phone' | 'image';
export type ErrorStaffFields = 'name' | 'address' | 'phone' | 'image' | 'password' | 'email';

interface CustomErrors {
    status?: number; // Status không bắt buộc nữa
    data?: {
        error: Record<ErrorFields, string[]>;
    };
}
interface StoreErrorWithData extends CustomErrors {
    data: {
        error: Record<ErrorFields, string[]>;
    };
}
interface StaffErrorWithData extends CustomErrors {
    data: {
        error: Record<ErrorStaffFields, string[]>;
    };
}

// Hàm kiểm tra xem một giá trị có phải là một ErrorField hay không

export const isStoreError = (error: any): error is StoreErrorWithData => {
    return error && error.data && 'error' in error.data;
};
export const isStaffError = (error: any): error is StaffErrorWithData => {
    return error && error.data && 'error' in error.data;
};
