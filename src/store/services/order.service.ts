import { IApiResponse } from '~/types/Api';
import baseApi from '../apis/baseApi';
import API_ENDPOINT from '~/constants/apiEndpoint';
import { IOderResponse } from '~/types/Order';
import { QUERY_KEY } from '~/constants/queryKey';

export const bookingAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBookingsList: builder.query<IApiResponse<{ data: IOderResponse[] }>, void>({
            query: () => ({ url: API_ENDPOINT.BOOKING.STAFF_BOOKINGS }),
            providesTags: [QUERY_KEY.ORDER],
        }),
    }),
});

export const { useGetBookingsListQuery } = bookingAPI;
