import { IApiResponse } from '~/types/Api';
import baseApi from '../apis/baseApi';
import API_ENDPOINT from '~/constants/apiEndpoint';
import { IOderResponse } from '~/types/Order';

export const bookingAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBookingsList: builder.query<IApiResponse<{ data: IOderResponse[] }>, void>({
            query: () => ({ url: API_ENDPOINT.BOOKING.LIST }),
        }),
    }),
});

export const { useGetBookingsListQuery } = bookingAPI;
