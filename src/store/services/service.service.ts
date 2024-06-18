import API_ENDPOINT from '~/constants/apiEndpoint';
import { QUERY_KEY } from '~/constants/queryKey';
import baseApi from '~/store/apis/baseApi';
import { IApiResponse } from '~/types/Api';
import { IServiceBody, IService, IServiceResponse } from '~/types/Service';

export const serviceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getListService: builder.query<IApiResponse<{ data: Omit<IService, 'category'>[] }>, void>({
            query: () => API_ENDPOINT.SERVICE.LIST,
            providesTags: [QUERY_KEY.SERVICE],
        }),
        getListServiceClient: builder.query<IApiResponse<{ data: Omit<IService, 'updated_at'>[] }>, void>({
            query: () => API_ENDPOINT.SERVICE.LIST_SERVICE_CLIENT,
            providesTags: [QUERY_KEY.SERVICE],
        }),
        createService: builder.mutation<IApiResponse<IServiceResponse>, IServiceBody>({
            query: (formData) => ({
                url: API_ENDPOINT.SERVICE.ADD,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [QUERY_KEY.SERVICE],
        }),
        updateService: builder.mutation<IApiResponse<IServiceResponse>, { id: number; formData: IServiceBody }>({
            query: ({ id, formData }) => ({
                url: `${API_ENDPOINT.SERVICE.EDIT}/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: [QUERY_KEY.SERVICE],
        }),
        getDetailService: builder.query<IApiResponse<{ data: Omit<IService, 'category'> }>, number>({
            query: (id) => `/services/${id}`,
        }),
        removeService: builder.mutation<object, number>({
            query: (id) => ({
                url: `/services/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [QUERY_KEY.SERVICE],
        }),
    }),
});

export const {
    useGetListServiceQuery,
    useGetDetailServiceQuery,
    useRemoveServiceMutation,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useGetListServiceClientQuery,
} = serviceApi;
