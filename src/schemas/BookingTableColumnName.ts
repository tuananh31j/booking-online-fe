/* eslint-disable no-unused-vars */
export const BookingTableColumnName = (t: (key: string) => string) => {
    return [
        t('columns.No'),
        t('columns.Day'),
        t('columns.Time'),
        t('columns.Status'),
        t('columns.Store_name'),
        t('columns.Store_address'),
        // t('columns.Actions'),
    ];
};
