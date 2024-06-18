'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Step } from '~/constants/enums';
import { IBooking, IDatePayload } from '~/types/Booking';
import { IStore } from '~/types/Store';

const initialState: { booking: IBooking; currentStep: Step; currentStoreInfo: IStore | null } = {
    currentStoreInfo: null,
    booking: {
        store_id: 0,
        user_id: 0,
        day: '',
        time: '',
        service_ids: [],
        customer_name: '',
        customer_date: '',
        customer_phone: '',
        customer_note: '',
        customer_email: '',
    },
    currentStep: Step.chooseStore,
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        chooseStore: (state, action: PayloadAction<IStore>) => {
            state.booking.store_id = action.payload.id;
            state.currentStoreInfo = action.payload;
            if (state.currentStep === Step.chooseStore) {
                state.currentStep += 1;
            }
        },
        chooseStaff: (state, action: PayloadAction<number>) => {
            state.booking.user_id = action.payload;
            if (state.currentStep === Step.chooseStaff) {
                state.currentStep += 1;
            }
        },
        chooseService: (state, action: PayloadAction<{ id: number }[]>) => {
            state.booking.service_ids = action.payload;
            if (state.currentStep === Step.chooseService) {
                state.currentStep += 1;
            }
        },
        chooseDate: (state, action: PayloadAction<IDatePayload>) => {
            state.booking.day = action.payload.day;
            state.booking.time = action.payload.time;
            if (state.currentStep === Step.chooseDate) {
                state.currentStep += 1;
            }
        },
        backStep: (state) => {
            if (state.currentStep === Step.chooseStaff) {
                state.booking.user_id = 0;
            }
            if (state.currentStep === Step.chooseService) {
                state.booking.service_ids = [];
            }
            if (state.currentStep === Step.chooseDate) {
                state.booking.day = '';
                state.booking.time = '';
            }
            state.currentStep -= 1;
        },
        resetStep: (state) => {
            state.booking = initialState.booking;
            state.currentStep = Step.chooseStore;
        },
    },
});

// export action
export const { chooseDate, chooseService, chooseStaff, chooseStore, backStep, resetStep } = bookingSlice.actions;

// export reducer
export default bookingSlice;
