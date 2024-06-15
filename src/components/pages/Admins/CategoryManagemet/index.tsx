'use client';

import { formatDate } from 'date-fns';
import { useEffect } from 'react';
import { CATEGORY_COLUMN_NAMES, CategoryRow } from '~/components/_common/TableDisplay/Rows/Category/CategoryRow';
import FormCategory from '~/components/_common/TableDisplay/Rows/Category/FormCategoy';
import TableDisplay from '~/components/_common/TableDisplay/TableDisplay';
import RowSkeleton from '~/components/_common/TableDisplay/_components/Skeleton/RowSkeleton';
import useToastDisplay from '~/hooks/useToastDisplay';
import { useGetListCategoryQuery, useRemoveCategoryMutation } from '~/store/services/category.service';
import { ICategoryItem } from '~/types/Category';

const CategoryManagment = () => {
    const { data, isLoading } = useGetListCategoryQuery();
    const categories = data?.data?.data;
    const [mutate, { isLoading: PendingRemove, isSuccess, isError }] = useRemoveCategoryMutation();
    const toast = useToastDisplay();
    const handleRemoveCategory = (id: number) => {
        mutate(id).unwrap();
    };
    useEffect(() => {
        if (isSuccess) {
            toast({ title: 'Xóa danh mục thành công', status: 'success' });
        }
        if (isError) {
            toast({ title: 'Xóa danh mục thất bại', status: 'destructive' });
        }
    }, [isSuccess, isError]);
    return (
        <>
            <TableDisplay
                title='Danh sách danh mục'
                columnNames={CATEGORY_COLUMN_NAMES}
                action={{ element: FormCategory, modalTitle: 'Thêm mới danh mục' }}
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
