import API_ENDPOINT from '~/constants/apiEndpoint';
import baseApi from '../apis/baseApi';
import { IApiResponse } from '~/types/Api';
import { IBookingPayload, IBookingResponse } from '~/types/Booking';
import { QUERY_KEY } from '~/constants/queryKey';
import { IOderResponse, IStaffOderResponse } from '~/types/Order';

const bookingAPi = baseApi.injectEndpoints({
    endpoints: (buildder) => ({
        createBooking: buildder.mutation<IApiResponse<IBookingResponse>, IBookingPayload>({
            query: (data) => ({
                url: API_ENDPOINT.BOOKING.ADD,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [QUERY_KEY.STAFF],
        }),
        updateBookingStatus: buildder.mutation<object, { bodyReq: { status: string }; id: number }>({
            query: ({ bodyReq, id }) => ({
                url: `${API_ENDPOINT.BOOKING.UPDATE}/${id}`,
                method: 'PUT',
                body: bodyReq,
            }),
            invalidatesTags: [QUERY_KEY.ORDER],
        }),
        adminGetBookingsList: buildder.query<IApiResponse<{ data: IOderResponse[] }>, void>({
            query: () => ({ url: API_ENDPOINT.BOOKING.LIST }),
            providesTags: [QUERY_KEY.ORDER],
        }),
        staffGetBookingsList: buildder.query<IApiResponse<{ data: IStaffOderResponse[] }>, void>({
            query: () => ({ url: API_ENDPOINT.BOOKING.STAFF_BOOKINGS }),
            providesTags: [QUERY_KEY.ORDER],
        }),
    }),
});

export const {
    useCreateBookingMutation,
    useUpdateBookingStatusMutation,
    useAdminGetBookingsListQuery,
    useStaffGetBookingsListQuery,
} = bookingAPi;
