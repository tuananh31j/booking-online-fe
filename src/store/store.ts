import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducers from './reducers';
import baseApi from './apis/baseApi';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
    reducer: rootReducers,
    devTools: process.env.NEXT_NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
