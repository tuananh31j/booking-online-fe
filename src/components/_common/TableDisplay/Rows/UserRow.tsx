import Image from 'next/image';
import { FC } from 'react';
import ActionLink from '~/components/_common/ActionLink';
import StatusTag from '~/components/_common/StatusTag';
import { UserRole } from '~/constants/enums';
import { disPlayRoleName } from '~/lib/utils';

type IUserRowProps = {
    avt: string;
    name: string;
    email: string;
    role: UserRole;
    status: boolean;
    createAt: string;
};

const USER_COLUMN_NAMES = ['Người dùng', 'Chức vụ', 'Trạng thái', 'Ngày tạo', 'Tùy chọn'];

const UserRow: FC<IUserRowProps> = ({ avt, name, email, role, status, createAt }) => {
    const roleName = disPlayRoleName(role);
    return (
        <tr>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='flex px-2 py-1'>
                    <div>
                        <Image
                            src={avt}
                            alt=''
                            width={10}
                            height={10}
                            className='mr-4 inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm text-white transition-all duration-200 ease-in-out'
                        />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <h6 className='mb-0 text-sm capitalize leading-normal dark:text-white'>{name}</h6>
                        <p className='mb-0 text-xs capitalize leading-tight text-slate-400 dark:text-white dark:opacity-80'>
                            {email}
                        </p>
                    </div>
                </div>
            </td>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <p className='mb-0 text-xs font-semibold capitalize leading-tight dark:text-white dark:opacity-80'>
                    {roleName}
                </p>
            </td>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle text-sm capitalize leading-normal shadow-transparent dark:border-white/40'>
                <StatusTag status={status} />
            </td>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <span className='text-xs font-semibold capitalize leading-tight text-slate-400 dark:text-white dark:opacity-80'>
                    {createAt}
                </span>
            </td>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <ActionLink
                    to='/'
                    className={[
                        'text-xs font-semibold capitalize leading-tight text-slate-400 dark:text-white dark:opacity-80',
                        'm-1 bg-black',
                    ]}
                >
                    Edit
                </ActionLink>
            </td>
        </tr>
    );
};

export { UserRow, USER_COLUMN_NAMES };
