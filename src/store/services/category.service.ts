import { get } from 'lodash';
import baseApi from '~/store/apis/baseApi';
import { IApiResponse } from '~/types/Api';
import { ICategoryItem } from '~/types/Category';

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getListCategory: builder.query<IApiResponse<{ data: ICategoryItem[] }>, void>({
            query: () => '/list_categorie',
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

export const { useGetListCategoryQuery } = categoryApi;
