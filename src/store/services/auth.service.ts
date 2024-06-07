import { IApiResponse } from '~/types/Api';
import baseApi from '../apis/baseApi';
import { ILoginBody, ILoginResponse } from '~/types/Auth';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IApiResponse<ILoginResponse>, ILoginBody>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
        }),
        logout: builder.query<void, void>({
            query: () => ({ url: '/logout' }),
        }),
    }),
});

export const { useLoginMutation, useLogoutQuery } = authApi;
