import baseApi from '~/store/apis/baseApi';
import { IApiResponse } from '~/types/Api';
import { IStoreItem } from '~/types/Store';

export const storeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getListStore: build.query<IApiResponse<{ data: IStoreItem[] }>, void>({
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
        removeStore: build.mutation<object, number>({
            query: (id) => ({
                url: `/store_delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => (error ? [] : [{ type: 'store', id: 'LIST' }]),
        }),
    }),
});

export const { useGetListStoreQuery, useRemoveStoreMutation } = storeApi;
