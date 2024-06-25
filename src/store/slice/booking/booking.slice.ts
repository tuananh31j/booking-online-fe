'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Step } from '~/constants/enums';
import { IStore } from '~/types/Store';
import { IDatePayload, initialState, IPlayloadServices } from './booking.slice.type';

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        chooseStore: (state, action: PayloadAction<IStore>) => {
            state.booking.store_id = action.payload.id;
            state.currentStoreInfo = action.payload;
            state.progressObj.store = { ...state.progressObj.store, active: true };
            if (state.currentStep === Step.chooseStore) {
                state.currentStep += 1;
            }
        },
        chooseStaff: (state, action: PayloadAction<number>) => {
            state.booking.user_id = action.payload;
            state.progressObj.staff = { ...state.progressObj.staff, active: true };
            if (state.currentStep === Step.chooseStaff) {
                state.currentStep += 1;
            }
        },
        chooseService: (state, action: PayloadAction<IPlayloadServices>) => {
            state.booking.service_ids = action.payload.services;
            state.totalSeviceCompletionTime = action.payload.totalTime;
            state.progressObj.service = { ...state.progressObj.service, active: true };
        },
        chooseDate: (state, action: PayloadAction<IDatePayload>) => {
            state.booking.day = action.payload.day;
            state.booking.time = action.payload.time;
            state.progressObj.date = { ...state.progressObj.date, active: true };
            if (state.currentStep === Step.chooseDate) {
                state.currentStep += 1;
            }
        },
        backStep: (state) => {
            if (state.currentStep === Step.chooseStaff) {
                state.booking.user_id = 0;
                state.progressObj.store = { ...state.progressObj.store, active: false };
            }
            if (state.currentStep === Step.chooseService) {
                state.booking.service_ids = [];
                state.progressObj.staff = { ...state.progressObj.staff, active: false };
            }
            if (state.currentStep === Step.chooseDate) {
                state.booking.day = '';
                state.booking.time = '';
                state.progressObj.service = { ...state.progressObj.service, active: false };
            }
            state.currentStep -= 1;
        },
        nextStep: (state) => {
            state.currentStep += 1;
        },
        resetStep: (state) => {
            state.booking = initialState.booking;
            state.currentStep = Step.chooseStore;
        },
    },
});

// export action
export const { chooseDate, chooseService, chooseStaff, chooseStore, backStep, resetStep, nextStep } =
    bookingSlice.actions;

// export reducer
export default bookingSlice;
