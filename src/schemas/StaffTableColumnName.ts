/* eslint-disable no-unused-vars */
export const StaffTableColumnName = (t: (key: string) => string) => {
    return [
        t('columns.Name'),
        t('columns.Role'),
        t('columns.Phone_number'),
        t('columns.Created_at'),
        t('columns.Actions'),
    ];
};
