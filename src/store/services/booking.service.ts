import API_ENDPOINT from '~/constants/apiEndpoint';
import baseApi from '../apis/baseApi';
import { QUERY_KEY } from '~/constants/queryKey';

const bookingAPi = baseApi.injectEndpoints({
    endpoints: (buildder) => ({
        createBooking: buildder.mutation({
            query: (data) => ({
                url: API_ENDPOINT.BOOKING.ADD,
                method: 'POST',
                body: data,
            }),
        }),
        updateBookingStatus: buildder.mutation<object, { bodyReq: { status: string }; id: number }>({
            query: ({ bodyReq, id }) => ({
                url: `${API_ENDPOINT.BOOKING.UPDATE}/${id}`,
                method: 'PUT',
                body: bodyReq,
            }),
            invalidatesTags: [QUERY_KEY.ORDER],
        }),
    }),
});

export const { useCreateBookingMutation, useUpdateBookingStatusMutation } = bookingAPi;
