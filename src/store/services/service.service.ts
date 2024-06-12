import { remove } from 'lodash';
import baseApi from '~/store/apis/baseApi';
import { IApiResponse } from '~/types/Api';
import { IServiceBody, IServiceItem, IServiceResponse } from '~/types/service';

export const serviceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getListService: builder.query<IApiResponse<{ data: IServiceItem[] }>, void>({
            query: () => '/services/list',
            providesTags(result) {
                if (result) {
                    const final = [...result.data.data.map(({ id }) => ({ type: 'service' as const, id: 'LIST' }))];
                    return final;
                }
                const final = [{ type: 'service' as const, id: 'LIST' }];
                return final;
            },
        }),
        createService: builder.mutation<IApiResponse<IServiceResponse>, IServiceBody>({
            query: (formData) => ({
                url: '/services/post',
                method: 'POST',
                body: formData,
            }),
        }),
        updateService: builder.mutation<IApiResponse<IServiceResponse>, { id: number; formData: IServiceBody }>({
            query: ({ id, formData }) => ({
                url: `/services/update/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: (result, error, { id }) => (error ? [] : [{ type: 'service', id: id.toString() }]),
        }),
        removeService: builder.mutation<object, number>({
            query: (id) => ({
                url: `/services/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => (error ? [] : [{ type: 'service', id: 'LIST' }]),
        }),
    }),
});

export const { useGetListServiceQuery, useRemoveServiceMutation, useCreateServiceMutation, useUpdateServiceMutation } =
    serviceApi;
