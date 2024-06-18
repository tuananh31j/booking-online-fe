import { IApiResponse } from '~/types/Api';
import baseApi from '../apis/baseApi';
import {
    IStaff,
    IStaffResponse,
    ISchedulesRequestBody,
    IWorkDate,
    IOpeningHoursResponse,
    IScheduleBody,
} from '~/types/Staff';
import API_ENDPOINT from '~/constants/apiEndpoint';
import { QUERY_KEY } from '~/constants/queryKey';
import { IScheduleResponse } from '~/types/Schedule';
import { IStoreWorkingTimeResponse } from '~/types/Store';

export const staffAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getListStaff: builder.query<IApiResponse<{ data: IStaff[] }>, void>({
            query: () => ({ url: API_ENDPOINT.USER.LIST }),
            providesTags: [QUERY_KEY.STAFF],
        }),
        getStaffDetail: builder.query<IApiResponse<{ data: IStaff }>, number | undefined>({
            query: (id) => ({ url: `/admin_users/show/${id}` }),
        }),
        createStaff: builder.mutation<IApiResponse<IStaffResponse>, FormData>({
            query(formData) {
                return {
                    url: API_ENDPOINT.USER.ADD,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: [QUERY_KEY.STAFF],
        }),
        editStaff: builder.mutation<object, { formdata: FormData; id: number }>({
            query: ({ formdata, id }) => ({
                url: `${API_ENDPOINT.USER.EDIT}/${id}`,
                method: 'POST',
                body: formdata,
            }),
            invalidatesTags: [QUERY_KEY.STAFF],
        }),

        getListBooking: builder.query<IApiResponse<{ data: IScheduleResponse[] }>, void>({
            query: () => API_ENDPOINT.USER.SEE_SCHEDULES,
        }),
        deleteStaff: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_ENDPOINT.USER.REMOVE}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [QUERY_KEY.STAFF],
        }),
        registerSchedule: builder.mutation<IApiResponse<{ data: IStoreWorkingTimeResponse[] }>, ISchedulesRequestBody>({
            query: (formData) => ({
                url: API_ENDPOINT.USER.ADD_SCHEDULES,
                method: 'POST',
                body: formData,
            }),
            // invalidatesTags: [QUERY_KEY.SERVICE],
        }),
        getListStaffClient: builder.query<IApiResponse<{ data: IStaff[] }>, number>({
            query: (id) => ({ url: `${API_ENDPOINT.USER.LIST_STAFF_OF_STORE}?storeId=${3}` }),
        }),
        getListWorkScheduleStaffClient: builder.query<IApiResponse<{ data: IWorkDate[] }>, void>({
            query: () => ({ url: `${API_ENDPOINT.USER.LIST_WORK_SCHEDULE}` }),
        }),
        seeOpeningHours: builder.query<IApiResponse<{ data: IOpeningHoursResponse[] }>, void>({
            query: () => ({ url: API_ENDPOINT.USER.SEE_OPENING_HOURS }),
        }),
    }),
});

export const {
    useEditStaffMutation,
    useDeleteStaffMutation,
    useGetStaffDetailQuery,
    useCreateStaffMutation,
    useGetListStaffClientQuery,
    useGetListStaffQuery,
    useGetListWorkScheduleStaffClientQuery,
    useGetListBookingQuery,
    useRegisterScheduleMutation,
    useSeeOpeningHoursQuery,
} = staffAPI;
