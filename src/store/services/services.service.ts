import { IApiResponse } from '~/types/Api';
import baseApi from '../apis/baseApi';
import { IGetServiceResponse } from '~/types/Service';
import { QUERY_KEY } from '~/constants/queryKey';

export const serviceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query<IApiResponse<IGetServiceResponse>, void>({
            query: () => ({
                url: '/list_service',
            }),
            providesTags: [{ type: QUERY_KEY.SERVICE, id: 'LIST' }],
        }),
    }),
});

export const { useGetServicesQuery } = serviceApi;
