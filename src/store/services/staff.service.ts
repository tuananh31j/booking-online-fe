import { IApiResponse } from '~/types/Api';
import baseApi from '../apis/baseApi';
import { IStaff } from '~/types/Staff';
import API_ENDPOINT from '~/constants/apiEndpoint';

export const staffAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        ListStaffClient: builder.query<IApiResponse<{ data: IStaff[] }>, void>({
            query: () => ({ url: API_ENDPOINT.USER.LIST }),
        }),
    }),
});

export const { useListStaffClientQuery } = staffAPI;
