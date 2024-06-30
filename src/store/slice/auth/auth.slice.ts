'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { ILoginData, ILoginResponse } from '~/types/Auth';

const cookies = new Cookies();

const initialState: { user: ILoginData | null } = {
    user: cookies.get('user') ? cookies.get('user') : null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<ILoginResponse>) => {
            state.user = action.payload.data;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

// export selector
// export const tokenSelecter = (state: RootState) => state.auth;

// export action
export const { login: loginAction, logout } = authSlice.actions;

// export reducer
export default authSlice;
