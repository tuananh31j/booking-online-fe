import API_ENDPOINT from '~/constants/apiEndpoint';
import { QUERY_KEY } from '~/constants/queryKey';
import baseApi from '~/store/apis/baseApi';
import { IApiResponse } from '~/types/Api';
import { ICategoryItem, ICategoryResponse } from '~/types/Category';

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getListCategory: builder.query<IApiResponse<{ data: ICategoryItem[] }>, void>({
            query: () => API_ENDPOINT.CATEGORY.LIST,
            providesTags: [QUERY_KEY.CATEGORIES],
        }),
        getDetailCategory: builder.query<IApiResponse<{ data: ICategoryItem }>, number | undefined>({
            query: (id) => `${API_ENDPOINT.CATEGORY.DETAILS}/${id}`,
            providesTags: (result) => (result ? [{ type: 'Category', id: result.data.data.id }] : []),
        }),
        editCategory: builder.mutation<IApiResponse<ICategoryResponse>, { name: string; id: number }>({
            query: ({ name, id }) => ({
                url: `${API_ENDPOINT.CATEGORY.EDIT}/${id}`,
                method: 'PUT',
                body: { name },
            }),
            invalidatesTags: (result) => (result ? [{ type: 'Category', id: result.data.data.id }] : []),
        }),
        removeCategory: builder.mutation<object, number>({
            query: (id) => ({
                url: `${API_ENDPOINT.CATEGORY.REMOVE}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [QUERY_KEY.CATEGORIES],
        }),
        createCategory: builder.mutation<IApiResponse<{ data: ICategoryResponse }>, { name: string }>({
            query: (name) => ({
                url: `${API_ENDPOINT.CATEGORY.ADD}`,
                method: 'POST',
                body: name,
            }),
            invalidatesTags: [QUERY_KEY.CATEGORIES],
        }),
    }),
});

export const {
    useGetListCategoryQuery,
    useRemoveCategoryMutation,
    useCreateCategoryMutation,
    useEditCategoryMutation,
    useGetDetailCategoryQuery,
} = categoryApi;
