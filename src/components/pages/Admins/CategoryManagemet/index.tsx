'use client';

import { formatDate } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { CategoryRow } from '~/components/_common/TableDisplay/Rows/Category/CategoryRow';
import FormCategory from '~/components/_common/TableDisplay/Rows/Category/FormCategoy';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import RowSkeleton from '~/components/_common/TableDisplay/_components/Skeleton/RowSkeleton';
import useToastDisplay from '~/hooks/useToastDisplay';
import { CategoryTableColumnName } from '~/schemas/CategoryTableColumnName';
import { useGetListCategoryQuery, useRemoveCategoryMutation } from '~/store/services/category.service';
import { ICategoryItem } from '~/types/Category';

const CategoryManagment = () => {
    const t = useTranslations('Table.Category');
    const CATEGORY_COLUMN_NAMES = CategoryTableColumnName(t);

    const { data, isLoading } = useGetListCategoryQuery();
    const categories = data?.data?.data;
    const [mutate, { isLoading: PendingRemove, isSuccess, isError }] = useRemoveCategoryMutation();
    const toast = useToastDisplay();
    const handleRemoveCategory = (id: number) => {
        mutate(id).unwrap();
    };
    useEffect(() => {
        if (isSuccess) {
            toast({ title: t('delete.success'), status: 'success' });
        }
        if (isError) {
            toast({ title: t('delete.fail'), status: 'destructive' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isError]);
    return (
        <>
            <TableDisplay
                title={t('title')}
                columnNames={CATEGORY_COLUMN_NAMES}
                action={{ element: FormCategory, modalTitle: t('modal_title') }}
            >
                {!isLoading &&
                    !PendingRemove &&
                    categories?.map((item: ICategoryItem, i: number) => (
                        <CategoryRow
                            key={i}
                            index={i + 1}
                            id={item.id}
                            name={item.name}
                            createAt={formatDate(item.created_at, 'yyyy/MM/dd | hh:mm:ss')}
                            action={handleRemoveCategory}
                        />
                    ))}
                {isLoading && <RowSkeleton rows={3} cols={CATEGORY_COLUMN_NAMES.length} />}
                {PendingRemove && <RowSkeleton rows={3} cols={CATEGORY_COLUMN_NAMES.length} />}
            </TableDisplay>
        </>
    );
};

export default CategoryManagment;
