'use client';

import { useState, useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Input } from '~/components/ui/input';
import { IOderResponse } from '~/types/Order';

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
    const [storeFilter] = useState<string | null>(null);
    const [staffFilter, setStaffFilter] = useState('');
    const [statusFilter] = useState<string | null>(null);

    return (
        <div className='ml-6 grid w-[95%] grid-cols-2 gap-4 rounded-lg p-4 shadow-md'>
            {/* Bộ lọc theo tên nhân viên */}
            <div className='flex flex-col gap-4'>
                <label
                    htmlFor='name'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                    Tên nhân viên
                </label>
                <Input
                    id='name'
                    placeholder='Nhập tên nhân viên'
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
                    Cửa hàng
                </label>
                <Select onValueChange={onStoreFilterChange} value={storeFilter ?? undefined}>
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Cửa hàng' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={'all'}>Tất cả</SelectItem>
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
                    Trạng thái
                </label>
                <Select onValueChange={onStatusFilterChange} value={statusFilter ?? undefined}>
                    <SelectTrigger id='status'>
                        <SelectValue placeholder='Chọn trạng thái' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={'all'}>Tất cả</SelectItem>
                        <SelectItem value='pending'>Đang chờ</SelectItem>
                        <SelectItem value='confirmed'>Đã xác nhận</SelectItem>
                        <SelectItem value='doing'>Đang thực hiện</SelectItem>
                        <SelectItem value='done'>Hoàn thành</SelectItem>
                        <SelectItem value='cancel'>Đã hủy</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default OrderFilter;
