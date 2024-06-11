import { QUERY_KEY } from '~/constants/queryKey';
import baseApi from '~/store/apis/baseApi';
import { IApiResponse } from '~/types/Api';
import { ICategoryItem } from '~/types/Category';

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getListCategory: builder.query<IApiResponse<{ data: ICategoryItem[] }>, void>({
            query: () => '/list_categorie',
            providesTags: [QUERY_KEY.CATEGORIES],
        }),
    }),
});

export const { useGetListCategoryQuery } = categoryApi;
