import API_ENDPOINT from '~/constants/apiEndpoint';
import baseApi from '../apis/baseApi';

const bookingAPi = baseApi.injectEndpoints({
    endpoints: (buildder) => ({
        createBooking: buildder.mutation({
            query: (data) => ({
                url: API_ENDPOINT.BOOKING.ADD,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useCreateBookingMutation } = bookingAPi;
