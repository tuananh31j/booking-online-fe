import Image from 'next/image';
import React from 'react';
import { Button } from '~/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog';

export default function PopupLocationStep({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className='min-w-[65vw]'>
                    <DialogHeader>
                        <DialogTitle>Cách để lấy được Location của cửa hàng</DialogTitle>
                    </DialogHeader>
                    <div className='max-h-[75vh] overflow-y-scroll p-5'>
                        <div>
                            <h3 className='text-xl font-bold'>Bước 1:</h3>
                            <p className='mt-2 text-base'>Bạn vào google maps trên google</p>
                            <Image
                                src={'https://res.cloudinary.com/dpplfiyki/image/upload/v1720270656/b1_zzkjlz.png'}
                                width={500}
                                height={100}
                                alt='Bước 1'
                                className='mt-2'
                            />
                        </div>
                        <hr className='my-4' />
                        <div>
                            <h3 className='text-xl font-bold'>
                                Bước 2:{' '}
                                <span className='text-sm text-[#777777]'>
                                    ( Lưu ý: Cửa hàng của bạn phải được đăng ký google maps)
                                </span>
                            </h3>
                            <p className='mt-2 text-base'>Bạn tìm địa chỉ của cửa hàng mình ở trên google maps </p>
                            <Image
                                src={'https://res.cloudinary.com/dpplfiyki/image/upload/v1720270970/b2_vdatil.png'}
                                width={800}
                                height={100}
                                alt='Bước 1'
                                className='mt-2'
                            />
                        </div>
                        <hr className='my-4' />

                        <div>
                            <h3 className='text-xl font-bold'>
                                Bước 3:{' '}
                                <span className='text-sm text-[#777777]'>
                                    ( Lưu ý: Cửa hàng của bạn phải được đăng ký google maps)
                                </span>
                            </h3>
                            <p className='mt-2 text-base'>
                                Ấn vào share địa chỉ của cửa hàng và sau đó ấn vào embed map như trong ảnh
                            </p>
                            <Image
                                src={'https://res.cloudinary.com/dpplfiyki/image/upload/v1720271138/b3_ojyx9s.png'}
                                width={500}
                                height={100}
                                alt='Bước 1'
                                className='mt-2'
                            />
                        </div>
                        <hr className='my-4' />

                        <div>
                            <h3 className='text-xl font-bold'>
                                Bước 4:{' '}
                                <span className='text-sm text-[#777777]'>
                                    ( Lưu ý: Cửa hàng của bạn phải được đăng ký google maps)
                                </span>
                            </h3>
                            <p className='mt-2 text-base'>
                                Đây là bước cuối cùng để kích cỡ là medium và bạn ấn vào copy html code sau đó dán vào ô
                                location trên phần thêm cửa hàng
                            </p>
                            <div className='flex'>
                                <Image
                                    src={'https://res.cloudinary.com/dpplfiyki/image/upload/v1720272485/b5_bi2wnb.png'}
                                    width={500}
                                    height={100}
                                    alt='Bước 1'
                                    className='mt-2'
                                />
                                <Image
                                    src={'https://res.cloudinary.com/dpplfiyki/image/upload/v1720271365/b4_pixnol.png'}
                                    width={500}
                                    height={100}
                                    alt='Bước 1'
                                    className='mt-2'
                                />
                            </div>
                        </div>

                        <hr className='my-4' />

                        <div>
                            <h3 className='text-xl font-bold'>Xin cảm ơn!</h3>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <Button type='submit'>Đã Hiểu</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
