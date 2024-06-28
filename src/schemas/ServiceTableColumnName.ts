/* eslint-disable no-unused-vars */
export const ServiceTableColumnName = (t: (key: string) => string) => {
    return [
        t('columns.No'),
        t('columns.Name'),
        t('columns.Category'),
        t('columns.Description'),
        t('columns.Price'),
        t('columns.Duration'),
        t('columns.Created_at'),
        t('columns.Actions'),
    ];
};
