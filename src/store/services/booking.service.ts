import API_ENDPOINT from '~/constants/apiEndpoint';
import baseApi from '../apis/baseApi';
import { IApiResponse } from '~/types/Api';
import { IBooking, IBookingPayload, IBookingResponse } from '~/types/Booking';

const bookingAPi = baseApi.injectEndpoints({
    endpoints: (buildder) => ({
        createBooking: buildder.mutation<IApiResponse<IBookingResponse>, IBookingPayload>({
            query: (data) => ({
                url: API_ENDPOINT.BOOKING.ADD,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useCreateBookingMutation } = bookingAPi;
