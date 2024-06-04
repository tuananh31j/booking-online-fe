'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '@reduxjs/toolkit/query';

type IAuth = {
    token: string;
};

const initialState = localStorage.getItem('accessToken')
    ? { token: localStorage.getItem('accessToken') }
    : { token: null };
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IAuth>) => {
            localStorage.setItem('accessToken', action.payload.token);
            state.token = action.payload.token;
        },
    },
});

// export selector
// export const tokenSelecter = (state: RootState) => state.auth;

// export action
export const { login: loginAction } = authSlice.actions;

// export reducer
const auth = authSlice.reducer;
export default auth;
