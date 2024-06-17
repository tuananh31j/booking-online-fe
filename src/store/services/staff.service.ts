import { IApiResponse } from '~/types/Api';
import baseApi from '../apis/baseApi';
import { IScheduleBody, ISchedulesRequestBody, IStaff } from '~/types/Staff';
import API_ENDPOINT from '~/constants/apiEndpoint';
import { IScheduleResponse } from '~/types/Schedule';
import { IStoreWorkingTimeResponse } from '~/types/Store';

export const staffAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        ListStaffClient: builder.query<IApiResponse<{ data: IStaff[] }>, void>({
            query: () => ({ url: API_ENDPOINT.USER.LIST }),
        }),

        getListBooking: builder.query<IApiResponse<{ data: IScheduleResponse[] }>, void>({
            query: () => API_ENDPOINT.USER.SEE_SCHEDULES,
        }),

        registerSchedule: builder.mutation<IApiResponse<{ data: IStoreWorkingTimeResponse[] }>, ISchedulesRequestBody>({
            query: (formData) => ({
                url: API_ENDPOINT.USER.ADD_SCHEDULES,
                method: 'POST',
                body: formData,
            }),
            // invalidatesTags: [QUERY_KEY.SERVICE],
        }),
    }),
});

export const { useListStaffClientQuery, useGetListBookingQuery, useRegisterScheduleMutation } = staffAPI;
