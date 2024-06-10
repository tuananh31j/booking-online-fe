import { IApiResponse } from '~/types/Api';
import baseApi from '../apis/baseApi';
import { IStaff } from '~/types/Staff';

export const staffAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        ListStaffClient: builder.query<IApiResponse<{ data: IStaff[] }>, void>({
            query: () => ({ url: '/list_user' }),
        }),
    }),
});

export const { useListStaffClientQuery } = staffAPI;
