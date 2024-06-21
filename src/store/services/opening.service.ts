import API_ENDPOINT from '~/constants/apiEndpoint';
import { QUERY_KEY } from '~/constants/queryKey';
import baseApi from '~/store/apis/baseApi';
import { IApiResponse } from '~/types/Api';
import { IOpeningBody, IOpeningByIdStoreResponse, IOpeningItem, IOpeningResponse } from '~/types/Opening';

export const openingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getListOpening: builder.query<IApiResponse<{ data: IOpeningItem[] }>, void>({
            query: () => API_ENDPOINT.OPENING.LIST,
            providesTags: [QUERY_KEY.OPENING],
        }),
        getOpeningDetail: builder.query<IApiResponse<{ data: IOpeningByIdStoreResponse[] }>, number | undefined>({
            query: (id) => `${API_ENDPOINT.OPENING.DETAILS}/${id}`,
            providesTags: [QUERY_KEY.OPENING],
        }),

        createOpening: builder.mutation<IApiResponse<IOpeningResponse>, { id: number; formData: IOpeningBody }>({
            query: ({ id, formData }) => ({
                url: `${API_ENDPOINT.OPENING.ADD}/${id}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [QUERY_KEY.OPENING],
        }),
        updateOpening: builder.mutation<IApiResponse<IOpeningResponse>, { id: number; formData: IOpeningBody }>({
            query: ({ id, formData }) => ({
                url: `${API_ENDPOINT.OPENING.EDIT}/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: [QUERY_KEY.OPENING],
        }),
    }),
});

export const { useGetListOpeningQuery, useCreateOpeningMutation, useGetOpeningDetailQuery, useUpdateOpeningMutation } =
    openingApi;
