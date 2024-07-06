'use client';

import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { useState, useCallback, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { FilterStaff } from '~/types/Filter';

const StaffFilter = ({ onFilterChange }: { onFilterChange: (filter: FilterStaff) => void }) => {
    const [nameFilter, setNameFilter] = useState('');
    const [selectedRole, setSelectedRole] = useState<string | null>('all');
    const [roleFilter, setRoleFilter] = useState<number | null>(null);

    const handleFilterChange = useCallback(() => {
        onFilterChange({
            name: nameFilter,
            role: roleFilter,
        });
    }, [nameFilter, roleFilter, onFilterChange]);

    const onValueChange = useCallback(
        (value: string) => {
            setSelectedRole(value);
            setRoleFilter(value !== 'all' ? parseInt(value, 10) : null);
            handleFilterChange();
        },
        [handleFilterChange]
    );
    useEffect(() => {
        handleFilterChange();
    }, [nameFilter, roleFilter, handleFilterChange]);

    return (
        <div className='ml-6 grid w-[95%] grid-cols-2 gap-4 rounded-lg p-4 shadow-md'>
            <div className='flex flex-col gap-4'>
                <label
                    htmlFor='name'
                    className=' text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                    Tên nhân viên
                </label>
                <Input
                    id='name'
                    placeholder='Nhập tên nhân viên'
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    onBlur={handleFilterChange}
                />
            </div>
            <div className='flex flex-col gap-4'>
                <label
                    htmlFor='role'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                    Vai trò
                </label>
                <Select onValueChange={onValueChange} value={selectedRole ?? undefined}>
                    <SelectTrigger id='role'>
                        <SelectValue placeholder='Chọn vai trò' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all'>Tất cả</SelectItem>
                        <SelectItem value='0'>Quản trị viên</SelectItem>
                        <SelectItem value='1'>Nhân viên</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default StaffFilter;
