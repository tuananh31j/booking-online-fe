import API_ENDPOINT from '~/constants/apiEndpoint';
import { QUERY_KEY } from '~/constants/queryKey';
import baseApi from '~/store/apis/baseApi';
import { IApiResponse } from '~/types/Api';
import { IStoreItem, IStoreResponse, IStoreWorkingTimeResponse } from '~/types/Store';

export const storeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getListStore: builder.query<IApiResponse<{ data: IStoreItem[] }>, void>({
            query: () => API_ENDPOINT.STORE.LIST,
            providesTags: [QUERY_KEY.STORE],
        }),
        removeStore: builder.mutation<object, number>({
            query: (id) => ({
                url: `${API_ENDPOINT.STORE.REMOVE}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [QUERY_KEY.STORE],
        }),
        createStore: builder.mutation<IApiResponse<IStoreResponse>, FormData>({
            query(formData) {
                return {
                    url: API_ENDPOINT.STORE.ADD,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: [QUERY_KEY.STORE],
        }),
        getDetailStore: builder.query<IApiResponse<{ data: IStoreItem }>, number | undefined>({
            query: (id) => `${API_ENDPOINT.STORE.DETAILS}/${id}`,
        }),
        updateStore: builder.mutation<IApiResponse<IStoreResponse>, { formdata: FormData; id: number }>({
            query: ({ formdata, id }) => ({
                url: `${API_ENDPOINT.STORE.EDIT}/${id}`,
                method: 'POST',
                body: formdata,
            }),
            invalidatesTags: [QUERY_KEY.STORE],
        }),
        getListWorkingTime: builder.query<IApiResponse<{ data: IStoreWorkingTimeResponse }>, string | undefined>({
            query: (id) => `${API_ENDPOINT.STORE.DETAILS}/${id}`,
        }),
    }),
});

export const {
    useGetListStoreQuery,
    useUpdateStoreMutation,
    useCreateStoreMutation,
    useRemoveStoreMutation,
    useGetDetailStoreQuery,
} = storeApi;
