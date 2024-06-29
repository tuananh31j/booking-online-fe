'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Step } from '~/constants/enums';
import { IStore } from '~/types/Store';
import { IDatePayload, initialState, IPlayloadServices } from './booking.slice.type';
import { IStaff } from '~/types/Staff';
import { IBookingResponse } from '~/types/Booking';

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        chooseStore: (state, action: PayloadAction<IStore>) => {
            state.booking.store = action.payload;
            state.currentStoreInfo = action.payload;
            state.progressObj.store = { ...state.progressObj.store, active: true };
            if (state.currentStep === Step.chooseStore) {
                state.currentStep += 1;
            }
        },
        chooseStaff: (state, action: PayloadAction<IStaff>) => {
            state.booking.user = action.payload;
            state.progressObj.staff = { ...state.progressObj.staff, active: true };
            if (state.currentStep === Step.chooseStaff) {
                state.currentStep += 1;
            }
        },
        chooseService: (state, action: PayloadAction<IPlayloadServices>) => {
            state.booking.service_ids = action.payload.services;
        },
        getNameServices: (state, action: PayloadAction<{ id: number; name: string }[]>) => {
            state.servicesName = action.payload;
        },
        chooseDate: (state, action: PayloadAction<IDatePayload>) => {
            state.booking.day = action.payload.day;
            state.booking.time = action.payload.time;
        },
        setBooking: (state, action: PayloadAction<IBookingResponse>) => {
            state.booked = action.payload;
        },
        backStep: (state) => {
            if (state.currentStep === Step.chooseStaff) {
                state.booking.user = null;
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
            if (state.currentStep === Step.confirmBooking) {
                state.progressObj.date = { ...state.progressObj.date, active: false };
            }
            state.currentStep -= 1;
        },
        nextStep: (state) => {
            if (state.currentStep === Step.chooseService) {
                state.progressObj.service = { ...state.progressObj.service, active: true };
            }
            if (state.currentStep === Step.chooseDate) {
                state.progressObj.date = { ...state.progressObj.date, active: true };
            }
            state.currentStep += 1;
        },
        resetStep: (state) => {
            state.booking = initialState.booking;
            state.currentStep = initialState.currentStep;
            state.progressObj = initialState.progressObj;
            state.servicesName = initialState.servicesName;
            state.currentStoreInfo = initialState.currentStoreInfo;
        },
    },
});

// export action
export const {
    chooseDate,
    chooseService,
    chooseStaff,
    chooseStore,
    backStep,
    resetStep,
    nextStep,
    getNameServices,
    setBooking,
} = bookingSlice.actions;

// export reducer
export default bookingSlice;
