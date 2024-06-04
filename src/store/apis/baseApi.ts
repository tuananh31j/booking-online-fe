import { createApi } from '@reduxjs/toolkit/query/react';
import { QUERY_KEY } from '~/constants/queryKey';
import baseQuery from './baseQuery'; // Import baseQuery

const tags = Object.values(QUERY_KEY);

const baseApi = createApi({
    reducerPath: 'root',
    tagTypes: [...tags],
    baseQuery, // Sử dụng baseQuery
    endpoints: () => ({}),
});

export default baseApi;
