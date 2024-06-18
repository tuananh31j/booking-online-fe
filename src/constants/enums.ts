/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum UserRole {
    Staff,
    Admin,
}
export enum BookingStatus {
    Pending = 'pending',
    Confirmed = 'confirmed',
    Canceled = 'canceled',
    Doing = 'doing',
    Done = 'done',
}

export enum Step {
    chooseStore = 1,
    chooseStaff,
    chooseService,
    chooseDate,
    confirmBooking,
}
