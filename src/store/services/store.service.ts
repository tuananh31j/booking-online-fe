import baseApi from '~/store/apis/baseApi';
import { IApiResponse } from '~/types/Api';
import { IStoreItem, IStoreResponse } from '~/types/Store';

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
            invalidatesTags: (error) => (error ? [] : [{ type: 'store', id: 'LIST' }]),
        }),

        createStore: builder.mutation<IApiResponse<IStoreResponse>, FormData>({
            query(formData) {
                return {
                    url: '/store_post',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: [{ type: 'store', id: 'LIST' }],
        }),
        getDetailStore: builder.query<IApiResponse<{ data: IStoreItem }>, number | undefined>({
            query: (id) => `/shows_store/${id}`,
        }),
        updateStore: builder.mutation<object, { formdata: FormData; id: number }>({
            query: ({ formdata, id }) => ({
                url: `/store/${id}`,
                method: 'POST',
                body: formdata,
            }),
            invalidatesTags: [{ type: 'store', id: 'LIST' }],
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
