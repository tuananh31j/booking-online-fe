import { createApi } from '@reduxjs/toolkit/query/react';
import { QUERY_KEY } from '~/constants/QueryKey';
import baseQuery from './baseQuery';

const tags = Object.values(QUERY_KEY);

const baseApi = createApi({
    reducerPath: 'root',
    tagTypes: [...tags],
    baseQuery,
    endpoints: () => ({}),
});

export default baseApi;
