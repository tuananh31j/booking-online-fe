import { remove } from 'lodash';
import { QUERY_KEY } from '~/constants/queryKey';
import baseApi from '~/store/apis/baseApi';
import { IApiResponse } from '~/types/Api';
import { IServiceBody, IServiceItem, IServiceResponse } from '~/types/service';

export const serviceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getListService: builder.query<IApiResponse<{ data: IServiceItem[] }>, void>({
            query: () => '/services/list',
            providesTags: [QUERY_KEY.SERVICE],
        }),
        createService: builder.mutation<IApiResponse<IServiceResponse>, IServiceBody>({
            query: (formData) => ({
                url: '/services/post',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [QUERY_KEY.SERVICE],
        }),
        updateService: builder.mutation<IApiResponse<IServiceResponse>, { id: number; formData: IServiceBody }>({
            query: ({ id, formData }) => ({
                url: `/services/update/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: [QUERY_KEY.SERVICE],
        }),
        getDetailService: builder.query<IApiResponse<{ data: IServiceItem }>, number>({
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
} = serviceApi;
