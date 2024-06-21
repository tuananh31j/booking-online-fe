'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { ILoginData, ILoginResponse } from '~/types/Auth';

const cookies = new Cookies();

const initialState: { user: ILoginData | '' } = {
    user: cookies.get('user') ? cookies.get('user') : '',
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<ILoginResponse>) => {
            state.user = action.payload.data;
        },
        logout: (state) => {
            state.user = '';
        },
    },
});

// export selector
// export const tokenSelecter = (state: RootState) => state.auth;

// export action
export const { login: loginAction } = authSlice.actions;

// export reducer
export default authSlice;
