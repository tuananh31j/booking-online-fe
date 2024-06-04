import baseApi from '../apis/baseApi';
import { ILoginBody, ILoginResponse } from '~/types/Auth';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILoginBody>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;
