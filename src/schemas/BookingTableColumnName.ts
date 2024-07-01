/* eslint-disable no-unused-vars */
export const AdminBookingTableColumnName = (t: (key: string) => string) => {
    return [
        t('admin-columns.Customer_name'),
        t('admin-columns.Phone_number'),
        t('admin-columns.Date'),
        t('admin-columns.Staff_name'),
        t('admin-columns.Store_name'),
        t('admin-columns.Status'),
        t('admin-columns.Total_price'),
        t('admin-columns.Note'),
        t('admin-columns.Actions'),
    ];
};

export const StaffBookingTableColumnName = (t: (key: string) => string) => {
    return [
        t('staff-columns.Day'),
        t('staff-columns.Status'),
        t('staff-columns.Store_address'),
        t('staff-columns.Store_name'),
        t('staff-columns.Time'),
    ];
};
