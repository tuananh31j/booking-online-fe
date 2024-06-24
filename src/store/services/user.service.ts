import { IApiResponse } from '~/types/Api';
import baseApi from '../apis/baseApi';
import API_ENDPOINT from '~/constants/apiEndpoint';
import { QUERY_KEY } from '~/constants/queryKey';
import { IUserResponse } from '~/types/User';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDetailUser: builder.query<IApiResponse<IUserResponse>, void>({
            query: () => `${API_ENDPOINT.AUTH.ME}`,
            providesTags: [QUERY_KEY.USER],
        }),
    }),
});

export const { useGetDetailUserQuery } = userApi;
