import API_ENDPOINT from '~/constants/apiEndpoint';
import { QUERY_KEY } from '~/constants/queryKey';
import baseApi from '~/store/apis/baseApi';
import { IApiResponse } from '~/types/Api';
import {
    IOpeningBody,
    IOpeningByIdStoreResponse,
    IOpeningItem,
    IOpeningResponse,
    IQuickCreateData,
} from '~/types/Opening';

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
        quickCreateOpening: builder.mutation<
            IApiResponse<IOpeningResponse>,
            { id: number; formData: IQuickCreateData }
        >({
            query: ({ id, formData }) => ({
                url: `/opening-hours/post_5day/${id}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [QUERY_KEY.OPENING],
        }),
        updateOpening: builder.mutation<IApiResponse<IOpeningResponse>, { id: number; formData: IOpeningBody }>({
            query: ({ id, formData }) => ({
                url: `${API_ENDPOINT.OPENING.EDIT}/${id}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [QUERY_KEY.OPENING],
        }),
        removeOneDay: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_ENDPOINT.OPENING.REMOVE}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [QUERY_KEY.OPENING],
        }),
    }),
});

export const {
    useGetListOpeningQuery,
    useRemoveOneDayMutation,
    useCreateOpeningMutation,
    useGetOpeningDetailQuery,
    useUpdateOpeningMutation,
    useQuickCreateOpeningMutation,
} = openingApi;
