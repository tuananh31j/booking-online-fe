import API_ENDPOINT from '~/constants/apiEndpoint';
import { QUERY_KEY } from '~/constants/queryKey';
import baseApi from '~/store/apis/baseApi';
import { IApiResponse } from '~/types/Api';
import { IOpeningItem } from '~/types/Opening';

export const openingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getListOpening: builder.query<IApiResponse<{ data: IOpeningItem[] }>, void>({
            query: () => API_ENDPOINT.OPENING.LIST,
            providesTags: [QUERY_KEY.OPENING],
        }),
    }),
});

export const { useGetListOpeningQuery } = openingApi;
