import Image from 'next/image';
import { FC } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import { disPlayRoleName } from '~/lib/utils';
import FormStaff from './FormStaff';

type IUserRowProps = {
    image: string | null;
    name: string;
    email: string;
    role: number;
    phone: string | null;
    address: string | null;
    createAt: string;
};

const USER_COLUMN_NAMES = ['Người dùng', 'Chức vụ', 'Điện thoại', 'Ngày tạo', 'Tùy chọn'];

const UserRow: FC<IUserRowProps> = ({ image, name, email, role, phone, createAt }) => {
    const roleName = disPlayRoleName(role);
    return (
        <tr>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <div className='flex px-2 py-1'>
                    <div>
                        {image && (
                            <Image
                                src={image}
                                alt=''
                                width={1150}
                                height={5150}
                                className='mr-4 inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm text-white transition-all duration-200 ease-in-out'
                            />
                        )}
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
                {phone}
            </td>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <span className='text-xs font-semibold capitalize leading-tight text-slate-400 dark:text-white dark:opacity-80'>
                    {createAt}
                </span>
            </td>
            <td className='whitespace-nowrap border-b bg-transparent p-2 align-middle capitalize shadow-transparent dark:border-white/40'>
                <PopupModal Form={FormStaff} btnName='Edit' title='Chỉnh sửa thông tin nhân viên' />
            </td>
        </tr>
    );
};

export { UserRow, USER_COLUMN_NAMES };
