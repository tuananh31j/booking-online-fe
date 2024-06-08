import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type } from 'os';

interface CustomError {
    status: number;
    data: {
        error: {
            name: string[];
        };
    };
    status_code: number;
}

export const isStoreError = (obj: any): obj is CustomError => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'status' in obj &&
        'data' in obj &&
        typeof obj.status === 'number' &&
        typeof obj.data === 'object' &&
        obj.data !== null &&
        'error' in obj.data &&
        'name' in obj.data.error &&
        Array.isArray(obj.data.error.name) &&
        'status_code' in obj.data &&
        typeof obj.data.status_code === 'number'
    );
};
