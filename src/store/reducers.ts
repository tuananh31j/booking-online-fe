import { combineReducers } from '@reduxjs/toolkit';
import baseApi from './apis/baseApi';
import bookingSlice from './slice/booking/booking.slice';
import authSlice from './slice/auth/auth.slice';

const rootReducers = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    booking: bookingSlice.reducer,
    auth: authSlice.reducer,
});

export default rootReducers;
