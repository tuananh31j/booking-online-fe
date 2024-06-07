import { IStoreBody, IStoreResponse } from '~/types/store';
import baseApi from '../apis/baseApi';
import { IApiResponse } from '~/types/Api';

export const storeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createStore: builder.mutation<IApiResponse<IStoreResponse>, IStoreBody>({
            query: (formData) => ({
                url: '/store_post',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const { useCreateStoreMutation } = storeApi;
