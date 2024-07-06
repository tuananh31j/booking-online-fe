'use client';

import { useState, useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Input } from '~/components/ui/input';
import { IOderResponse } from '~/types/Order';
import { useTranslations } from 'next-intl';

interface Filter {
    storeName: string | null;
    staffName: string;
    status: string | null;
}

interface OrderFilterProps {
    orders: IOderResponse[];
    onStoreFilterChange: (storeName: string | null) => void;
    onStaffFilterChange: (staffName: string) => void;
    onStatusFilterChange: (status: string | null) => void;
}

const OrderFilter: React.FC<OrderFilterProps> = ({
    orders,
    onStoreFilterChange,
    onStaffFilterChange,
    onStatusFilterChange,
}) => {
    const t = useTranslations('Table.Booking.filter');

    const [storeFilter] = useState<string | null>(null);
    const [staffFilter, setStaffFilter] = useState('');
    const [statusFilter] = useState<string | null>(null);

    return (
        <div className='ml-6 grid w-[95%] grid-cols-3 gap-4 rounded-lg p-4 shadow-md'>
            {/* Bộ lọc theo tên nhân viên */}
            <div className='flex flex-col gap-4'>
                <label
                    htmlFor='name'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                    {t('labels.Name')}
                </label>
                <Input
                    id='name'
                    placeholder={t('placeholder.Name')}
                    value={staffFilter}
                    onChange={(e) => {
                        setStaffFilter(e.target.value);
                        onStaffFilterChange(e.target.value);
                    }}
                />
            </div>

            {/* Bộ lọc theo tên cửa hàng */}
            <div className='flex flex-col gap-4'>
                <label
                    htmlFor='store'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                    {t('labels.Store')}
                </label>
                <Select onValueChange={onStoreFilterChange} defaultValue='all' value={storeFilter ?? undefined}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder={t('placeholder.Store')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={'all'}>{t('all')}</SelectItem>
                        {/* Lấy danh sách cửa hàng trực tiếp từ orders */}
                        {Array.from(new Set(orders.map((item) => item.store_name)))
                            .sort()
                            .map((storeName) => (
                                <SelectItem key={storeName} value={storeName}>
                                    {storeName}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Bộ lọc theo trạng thái */}
            <div className='flex flex-col gap-4'>
                <label
                    htmlFor='status'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                    {t('labels.Status')}
                </label>
                <Select onValueChange={onStatusFilterChange} defaultValue='all' value={statusFilter ?? undefined}>
                    <SelectTrigger id='status'>
                        <SelectValue placeholder={t('placeholder.Status')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={'all'}>{t('all')}</SelectItem>
                        <SelectItem value='pending'>{t('status_select.pending')}</SelectItem>
                        <SelectItem value='confirmed'>{t('status_select.confirmed')}</SelectItem>
                        <SelectItem value='doing'>{t('status_select.doing')}</SelectItem>
                        <SelectItem value='done'>{t('status_select.done')}</SelectItem>
                        <SelectItem value='cancel'>{t('status_select.canceled')}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default OrderFilter;
