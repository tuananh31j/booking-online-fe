/* eslint-disable no-unused-vars */
export const StoreTableColumnName = (t: (key: string) => string) => {
    return [
        t('columns.No'),
        t('columns.Name'),
        t('columns.Address'),
        t('columns.Phone_number'),
        t('columns.Created_at'),
        t('columns.Actions'),
    ];
};
