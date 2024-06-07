import baseApi from '~/store/apis/baseApi';
import { IApiResponse } from '~/types/Api';
import { IStoreBody, IStoreItem, IStoreResponse } from '~/types/Store';

export const storeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getListStore: builder.query<IApiResponse<{ data: IStoreItem[] }>, void>({
            query: () => '/list_store',
            providesTags(result) {
                if (result) {
                    const final = [...result.data.data.map(({ id }) => ({ type: 'store' as const, id: 'LIST' }))];
                    return final;
                }
                const final = [{ type: 'store' as const, id: 'LIST' }];
                return final;
            },
        }),
        removeStore: builder.mutation<object, number>({
            query: (id) => ({
                url: `/store_delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => (error ? [] : [{ type: 'store', id: 'LIST' }]),
        }),

        createStore: builder.mutation<IApiResponse<IStoreResponse>, IStoreBody>({
            query: (formData) => ({
                url: '/store_post',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const { useGetListStoreQuery, useCreateStoreMutation, useRemoveStoreMutation } = storeApi;
