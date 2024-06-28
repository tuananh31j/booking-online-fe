/* eslint-disable no-unused-vars */
export const BookingTableColumnName = (t: (key: string) => string) => {
    return [
        t('columns.Customer_name'),
        t('columns.Phone_number'),
        t('columns.Date'),
        t('columns.Staff_name'),
        t('columns.Store_name'),
        t('columns.Status'),
        t('columns.Total_price'),
        t('columns.Note'),
        t('columns.Actions'),
    ];
};
