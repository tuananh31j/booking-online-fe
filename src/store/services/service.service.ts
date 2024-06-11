import { QUERY_KEY } from '~/constants/queryKey';
import baseApi from '~/store/apis/baseApi';
import { IApiResponse } from '~/types/Api';
import { IServiceBody, IServiceItem, IServiceResponse } from '~/types/Service';

export const serviceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getListService: builder.query<IApiResponse<{ data: IServiceItem[] }>, void>({
            query: () => '/list_service',
            providesTags: [QUERY_KEY.SERVICE],
        }),
        createService: builder.mutation<IApiResponse<IServiceResponse>, IServiceBody>({
            query: (formData) => ({
                url: '/service_post',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [QUERY_KEY.SERVICE],
        }),
        updateService: builder.mutation<IApiResponse<IServiceResponse>, { id: number; formData: IServiceBody }>({
            query: ({ id, formData }) => ({
                url: `/service_update/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: [QUERY_KEY.SERVICE],
        }),
        removeService: builder.mutation<object, number>({
            query: (id) => ({
                url: `/delete_service/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [QUERY_KEY.SERVICE],
        }),
    }),
});

export const { useGetListServiceQuery, useRemoveServiceMutation, useCreateServiceMutation } = serviceApi;
