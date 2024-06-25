import { IApiResponse } from '~/types/Api';
import baseApi from '../apis/baseApi';
import API_ENDPOINT from '~/constants/apiEndpoint';
import { QUERY_KEY } from '~/constants/queryKey';
import { IFormProfileBody, IUserResponse } from '~/types/User';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDetailUser: builder.query<IApiResponse<IUserResponse>, void>({
            query: () => `${API_ENDPOINT.AUTH.ME}`,
            providesTags: [QUERY_KEY.USER],
        }),
        updateUserProfile: builder.mutation<IApiResponse<IUserResponse>, FormData>({
            query(formData) {
                return {
                    url: API_ENDPOINT.PROFILE.UPDATE,
                    method: 'POST',
                    body: formData,
                };
            },
        }),
    }),
});

export const { useGetDetailUserQuery, useUpdateUserProfileMutation } = userApi;
