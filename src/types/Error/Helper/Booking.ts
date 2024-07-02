export type ErrorFields = 'email' | 'fullName' | 'birthday' | 'phone';

interface CustomErrros {
    status?: number;
    data?: {
        error: Record<ErrorFields, string[]>;
    };
}

interface BookingErrorWithData extends CustomErrros {
    data: {
        error: Record<ErrorFields, string[]>;
    };
}

export const isBookingError = (error: any): error is BookingErrorWithData => {
    return error && error.data && 'error' in error.data;
};
