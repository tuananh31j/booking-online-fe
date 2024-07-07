'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { FilterStaff } from '~/types/Filter';

const StaffFilter = ({ onFilterChange }: { onFilterChange: (filter: FilterStaff) => void }) => {
    const t = useTranslations('Table.Staff.filter');

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
                    {t('labels.Name')}
                </label>
                <Input
                    id='name'
                    placeholder={t('placeholder.Name')}
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
                    {t('labels.Role')}
                </label>
                <Select onValueChange={onValueChange} value={selectedRole ?? undefined}>
                    <SelectTrigger id='role'>
                        <SelectValue placeholder={t('placeholder.Role')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='all'>{t('all')}</SelectItem>
                        <SelectItem value='0'>{t('role_select.admin')}</SelectItem>
                        <SelectItem value='1'>{t('role_select.staff')}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default StaffFilter;
