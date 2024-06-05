'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { ILoginResponse } from '~/types/Auth';
// import { RootState } from '@reduxjs/toolkit/query';
const cookies = new Cookies();

const initialState: { user: ILoginResponse } = { user: cookies.get('user') ? cookies.get('user') : '' };
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<ILoginResponse>) => {
            cookies.set('user', action.payload.data);
            cookies.set('accessToken', action.payload.token);
            state.user = action.payload;
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
