import { IApiResponse } from '~/types/Api';
import baseApi from '../apis/baseApi';
import { ILoginBody, ILoginResponse } from '~/types/Auth';
import API_ENDPOINT from '~/constants/apiEndpoint';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IApiResponse<ILoginResponse>, ILoginBody>({
            query: (body) => ({
                url: API_ENDPOINT.AUTH.LOGIN,
                method: 'POST',
                body,
            }),
        }),
        logout: builder.query<void, void>({
            query: () => ({ url: API_ENDPOINT.AUTH.LOGOUT }),
        }),
    }),
});

export const { useLoginMutation, useLogoutQuery } = authApi;
