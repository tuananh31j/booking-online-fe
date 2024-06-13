import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
        const token = cookies.get('accessToken');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export default baseQuery;
