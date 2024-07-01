export type ErrorFields = 'name' | 'address' | 'phone' | 'image';
export type ErrorStaffFields = 'name' | 'address' | 'phone' | 'image' | 'password' | 'email';
export type ErrorOpeningHours = 'day' | 'closing_time' | 'opening_time';
interface CustomErrors {
    status?: number;
    data?: {
        error: Record<ErrorFields, string[]>;
    };
}
interface StaffErrorWithData extends CustomErrors {
    data: {
        error: Record<ErrorStaffFields, string[]>;
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
interface MessageError {
    data: {
        message: string | [];
    };
}

// Hàm kiểm tra xem một giá trị có phải là một ErrorField hay không

export const isStoreError = (error: any): error is StoreErrorWithData => {
    return error && error.data && 'error' in error.data;
};

export const isStaffError = (error: any): error is StaffErrorWithData => {
    return error && error.data && 'error' in error.data;
};
export type CategoryErrorField = 'name';
export interface CategoryError {
    status?: number; // Status không bắt buộc nữa
    data?: {
        error: Record<CategoryErrorField, string[]>;
    };
}
export interface CategoryErrorWithData extends CategoryError {
    data: {
        error: Record<CategoryErrorField, string[]>;
    };
}
export const isCategoryError = (error: any): error is CategoryErrorWithData => {
    return error && error.data && 'error' in error.data;
};

export const isMessageError = (error: any): error is MessageError => {
    return error && error.data && 'message' in error.data;
};
interface OpeningHoursWithData {
    data: {
        error: Record<ErrorOpeningHours, string[]>;
    };
}
export const isOpeningHourError = (error: any): error is OpeningHoursWithData => {
    return error && error.data && 'error' in error.data;
};
