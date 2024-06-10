import { get } from 'lodash';
import baseApi from '~/store/apis/baseApi';
import { IApiResponse } from '~/types/Api';

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getListCategory: builder.query<IApiResponse<{ data: { id: number; name: string }[] }>, void>({
            query: () => '/list_category',
            providesTags(result) {
                if (result) {
                    const final = [...result.data.data.map(({ id }) => ({ type: 'category' as const, id: 'LIST' }))];
                    return final;
                }
                const final = [{ type: 'category' as const, id: 'LIST' }];
                return final;
            },
        }),
    }),
});
