/* eslint-disable no-unused-vars */
import Image from 'next/image';
import { FC } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import { disPlayRoleName } from '~/lib/utils';
import FormStaff from './FormStaff';
import Cookies from 'universal-cookie';
import AlertDialogConfirm from '~/components/elements/AlertDialog';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { useGetDetailStoreQuery } from '~/store/services/store.service';
import { useRouter } from 'next/navigation';
import TableCell from '../../_components/TableCell';
import { useTranslations } from 'next-intl';

type IUserRowProps = {
    id: number;
    image: string;
    name: string;
    email: string;
    role: number;
    phone: string | null;
    address: string | null;
    store_id: number;
    action: (id: number) => void;
    createAt?: string;
};

const cookies = new Cookies();
const UserRow: FC<IUserRowProps> = ({
    id,
    image,
    name,
    email,
    role,
    phone,
    // eslint-disable-next-line camelcase
    store_id,
    createAt,
    action,
}) => {
    const t = useTranslations('Table');
    const noData = useTranslations('Table.Staff.columns');
    // eslint-disable-next-line camelcase
    const storeId = store_id;
    const router = useRouter();

    const { data } = useGetDetailStoreQuery(storeId, { skip: !storeId });
    const store = data?.data?.data;

    const roleName = disPlayRoleName(role);
    const user = cookies.get('user');
    if (!user) {
        router.replace('/login');
    }
    return (
        <tr>
            <TableCell>
                <div className='flex px-2 py-1'>
                    <div>
                        <Image
                            src={image || 'https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg'}
                            alt=''
                            width={1150}
                            height={5150}
                            className='mr-4 inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm text-white transition-all duration-200 ease-in-out'
                        />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <h6 className='mb-0 text-sm capitalize leading-normal dark:text-white'>
                            <Dialog>
                                <DialogTrigger className='w-full hover:underline'>{name}</DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            <div className='pl-2 text-2xl font-normal dark:text-white'>Staffs info</div>
                                        </DialogTitle>

                                        <div className='flex space-x-5 p-5'>
                                            <Image
                                                src={
                                                    image ||
                                                    'https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg'
                                                }
                                                alt="staff's image"
                                                className='h-40 w-40 rounded-lg object-cover shadow-lg'
                                                width={180}
                                                height={180}
                                                quality={100}
                                            />
                                            <div className='space-y-2 text-lg dark:text-white'>
                                                <p className='mb-2'>
                                                    <strong>Name:</strong> {name && name}
                                                </p>

                                                <p className='mb-2'>
                                                    <strong>Email:</strong> {email && email}
                                                </p>

                                                <p className='mb-2'>
                                                    <strong>Contact number:</strong>{' '}
                                                    {(phone && phone) || noData('nullData')}
                                                </p>

                                                <p className='mb-2'>
                                                    <strong>Working at:</strong> {store?.name || noData('nullData')}
                                                </p>
                                            </div>
                                        </div>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </h6>
                    </div>
                </div>
            </TableCell>
            <TableCell>{roleName}</TableCell>
            <TableCell>{phone || noData('nullData')}</TableCell>
            <TableCell>{createAt || noData('nullData')}</TableCell>
            <TableCell>
                <div className='flex items-center gap-2'>
                    <PopupModal
                        btnName={<PencilIcon className='cursor-pointer duration-300 hover:text-blue-500' />}
                        className='flex items-center'
                        Form={FormStaff}
                        id={id}
                        title='Chỉnh sửa thông tin nhân viên'
                    />
                    {id !== user.id && (
                        <AlertDialogConfirm
                            handleConfirm={action}
                            content={{
                                title: t('Staff.confirm.title'),
                                description: t('Staff.confirm.description'),
                                idContent: id,
                            }}
                        >
                            <Trash2Icon className='cursor-pointer duration-300 hover:text-red-500'>Delete</Trash2Icon>
                        </AlertDialogConfirm>
                    )}
                    {id === user.id && (
                        <AlertDialogConfirm
                            content={{
                                title: 'Bạn không được phép!',
                                description: 'Bạn đang đăng nhập ở tài khoản này không thể xóa tài khoản này',
                                idContent: id,
                            }}
                        >
                            <Trash2Icon className='cursor-pointer duration-300 hover:text-red-500' />
                        </AlertDialogConfirm>
                    )}
                </div>
            </TableCell>
        </tr>
    );
};

export { UserRow };
