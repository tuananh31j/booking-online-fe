/* eslint-disable no-unused-vars */
import Image from 'next/image';
import { FC } from 'react';
import PopupModal from '~/components/_common/PopupModal';
import { disPlayRoleName } from '~/lib/utils';
import FormStaff from './FormStaff';
import Cookies from 'universal-cookie';
import AlertDialogConfirm from '~/components/elements/AlertDialog';
import { Trash2Icon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { useGetDetailStoreQuery } from '~/store/services/store.service';
import { useRouter } from 'next/navigation';
import TableCell from '../../_components/TableCell';

type IUserRowProps = {
    id: number;
    image: string;
    name: string;
    email: string;
    role: number;
    phone: string | null;
    address: string | null;
    store_information_id: number;
    action: (id: number) => void;
    createAt?: string;
};

const USER_COLUMN_NAMES = ['Người dùng', 'Chức vụ', 'Điện thoại', 'Ngày tạo', 'Tùy chọn'];

const cookies = new Cookies();
const UserRow: FC<IUserRowProps> = ({
    id,
    image,
    name,
    email,
    role,
    phone,
    // eslint-disable-next-line camelcase
    store_information_id,
    createAt,
    action,
}) => {
    // eslint-disable-next-line camelcase
    const storeId = store_information_id;
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
                        <h6 className='mb-0 text-sm capitalize leading-normal dark:text-white'>
                            <Dialog>
                                <DialogTrigger className='w-full hover:underline'>{name}</DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            <div className='pl-2 text-2xl font-normal dark:text-white'>Staffs info</div>
                                        </DialogTitle>

                                        <div className='flex space-x-5 p-5'>
                                            {image && (
                                                <Image
                                                    src={image}
                                                    alt="staff's image"
                                                    className='h-40 w-40 object-cover shadow-lg '
                                                    width={180}
                                                    height={180}
                                                    quality={100}
                                                />
                                            )}
                                            <div className='space-y-2 text-lg dark:text-white'>
                                                <p className='mb-2'>
                                                    <strong>Name:</strong> {name && name}
                                                </p>

                                                <p className='mb-2'>
                                                    <strong>Email:</strong> {email && email}
                                                </p>

                                                <p className='mb-2'>
                                                    <strong>Contact number:</strong> {phone && phone}
                                                </p>

                                                <p className='mb-2'>
                                                    <strong>Working at:</strong> {store && store?.name}
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
            <TableCell>{phone}</TableCell>
            <TableCell>{createAt}</TableCell>
            <TableCell>
                <div className='flex items-center justify-center gap-2'>
                    <PopupModal Form={FormStaff} id={id} btnName='Edit' title='Chỉnh sửa thông tin nhân viên' />
                    {id !== user.id && (
                        <AlertDialogConfirm
                            handleConfirm={action}
                            content={{
                                title: 'Bạn có chắc chắn không?',
                                description: 'Bạn có muốn xóa sản phẩm này không khi xóa sẽ không thể khổi phục',
                                idContent: id,
                            }}
                        >
                            <Trash2Icon className='h-4 w-4 cursor-pointer duration-300 hover:text-red-500' />
                        </AlertDialogConfirm>
                    )}
                    {id === user.id && (
                        <div>
                            <AlertDialogConfirm
                                content={{
                                    title: 'Bạn không được phép!',
                                    description: 'Bạn đang đăng nhập ở tài khoản này không thể xóa tài khoản này',
                                    idContent: id,
                                }}
                            >
                                <Trash2Icon className='h-4 w-4 cursor-pointer duration-300 hover:text-red-500' />
                            </AlertDialogConfirm>
                        </div>
                    )}
                </div>
            </TableCell>
        </tr>
    );
};

export { UserRow, USER_COLUMN_NAMES };
