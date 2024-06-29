import { IApiResponse } from '~/types/Api';
import baseApi from '../apis/baseApi';
import API_ENDPOINT from '~/constants/apiEndpoint';
import { QUERY_KEY } from '~/constants/queryKey';
import { IFormProfileBody, IUserResponse } from '~/types/User';
import { IOderResponse } from '~/types/Order';

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
        getBookingSchedule: builder.query<IApiResponse<{ data: IOderResponse[] }>, void>({
            query: () => `${API_ENDPOINT.USER.BOOKING_SCHEDULES}`,
            providesTags: [QUERY_KEY.USER],
        }),
    }),
});

export const { useGetDetailUserQuery, useUpdateUserProfileMutation, useGetBookingScheduleQuery } = userApi;
