import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog';

const PopupStaffProfile = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Dialog>
                <DialogTrigger>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <p className='da pl-2 text-2xl font-normal dark:text-white'>Information</p>
                        </DialogTitle>
                        <DialogDescription>
                            <div className='flex space-x-5 p-5'>
                                <Image
                                    src='https://i.redd.it/030mmgcrecta1.png'
                                    alt='avatar'
                                    className='h-48 w-48 object-cover shadow-lg '
                                    width={180}
                                    height={180}
                                    quality={100}
                                />
                                <div className='space-y-2 text-lg dark:text-white'>
                                    <p className='mb-2'>
                                        <strong>Name:</strong> Staffs Name{' '}
                                    </p>
                                    <p className='mb-2'>
                                        <strong>Age:</strong> 28
                                    </p>
                                    <p className='mb-2'>
                                        <strong>Country:</strong> Viet Nam{' '}
                                    </p>
                                    <p className='mb-2'>
                                        <strong>Phone:</strong> 0589987566
                                    </p>
                                </div>
                            </div>
                            <div className='mt-4 px-4 text-base dark:text-white'>
                                <p className='mb-2 '>
                                    <strong>Experience:</strong> Skilled short hair stylist ensures confidence and style
                                    for clients.
                                </p>
                                <p className=''>
                                    <strong>Describe:</strong> Expert short hair stylist delivers confidence and style
                                    with precise cuts and personalized service, crafting trendy looks tailored to each
                                    clients features and preferences
                                </p>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};
export default PopupStaffProfile;
