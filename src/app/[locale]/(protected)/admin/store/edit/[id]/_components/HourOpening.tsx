import { Eye, Plus, Trash2Icon } from 'lucide-react';
import PopupDetailOpening from '~/app/[locale]/(protected)/admin/store/edit/[id]/_components/PopupDetailOpening';
import PopupModal from '~/components/_common/PopupModal';
import FormOpening from '~/components/_common/TableDisplay/Rows/Opening/FormOpening';
import { Button } from '~/components/ui/button';
import { useGetOpeningDetailQuery } from '~/store/services/opening.service';
import { IStore } from '~/types/Store';

export default function HourOpening({ store }: { store: IStore }) {
    const { data, isLoading } = useGetOpeningDetailQuery(store.id, { skip: !store.id });
    const opening = data?.data.data;
    return (
        <>
            <div className='w-full px-6'>
                <div className='flex justify-between'>
                    <h3 className='mb-2 text-xl'>Thông tin ngày mở cửa</h3>
                    <PopupModal
                        id={store.id}
                        Form={FormOpening}
                        btnName={
                            <span className='flex items-center'>
                                <Plus />
                                Thêm ngày mở cửa
                            </span>
                        }
                        title={`Thêm ngày mở cửa cho cửa hàng ${store.name}`}
                    />
                </div>
                <div className='no-scrollbar max-h-[424px] w-full overflow-y-scroll rounded-md'>
                    <div className='flex  w-full flex-wrap gap-x-6 gap-y-3  text-lg dark:text-white'>
                        {opening?.map((item, index) => {
                            return (
                                <div key={index} className='mb-2 flex gap-3 rounded-md bg-card p-5'>
                                    <div>
                                        <p className='flex items-center'>
                                            <strong>Day: </strong>
                                            {item.day}
                                        </p>
                                        <p className=' flex items-center'>
                                            <strong>Opening Time:</strong>
                                            {item.opening_time}
                                        </p>
                                        <p>
                                            <strong>Closing Time:</strong>
                                            {item.closing_time}
                                        </p>
                                    </div>
                                    <div className='flex flex-col items-center justify-between'>
                                        <PopupDetailOpening store={store} detail={item}>
                                            <Eye />
                                        </PopupDetailOpening>
                                        <Button>
                                            <Trash2Icon className='h-4 w-4 cursor-pointer ' />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
