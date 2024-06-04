import { combineReducers } from '@reduxjs/toolkit';
import baseApi from './apis/baseApi';
import auth from './slice/auth.slice';

const rootReducers = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth,
});

export default rootReducers;
