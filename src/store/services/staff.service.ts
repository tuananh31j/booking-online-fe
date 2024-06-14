import { IApiResponse } from '~/types/Api';
import baseApi from '../apis/baseApi';
import { IStaff } from '~/types/Staff';
import API_ENDPOINT from '~/constants/apiEndpoint';
import { IScheduleResponse } from '~/types/Schedule';

export const staffAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        ListStaffClient: builder.query<IApiResponse<{ data: IStaff[] }>, void>({
            query: () => ({ url: API_ENDPOINT.USER.LIST }),
        }),

        getListBooking: builder.query<IApiResponse<{ data: IScheduleResponse[] }>, void>({
            query: () => API_ENDPOINT.USER.SEE_SCHEDULES,
        }),
    }),
});

export const { useListStaffClientQuery, useGetListBookingQuery } = staffAPI;
