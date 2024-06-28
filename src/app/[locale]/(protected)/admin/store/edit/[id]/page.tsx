'use client';

import { Tabs } from '@radix-ui/react-tabs';
import { CircleUserIcon, Clock, Database } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import BaseStore from '~/app/[locale]/(protected)/admin/store/edit/[id]/_components/BaseStore';
import HourOpening from '~/app/[locale]/(protected)/admin/store/edit/[id]/_components/HourOpening';
import ManagerStaff from '~/app/[locale]/(protected)/admin/store/edit/[id]/_components/staff/manegerStaff';
import LoadingButton from '~/components/elements/LoadingButton';
import { TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { useGetDetailStoreQuery } from '~/store/services/store.service';

export default function DetailStore({ params }: { params: { id: number } }) {
    const { data, isLoading, refetch } = useGetDetailStoreQuery(params.id);
    const detailStore = data?.data.data;
    return (
        <div className='min-h-[85vh] rounded-lg bg-reverse p-5 shadow-xl'>
            {!isLoading && (
                <div>
                    <div className='flex justify-between'>
                        <h3 className='text-xl font-medium'>
                            Thông tin chi tiết cửa hàng <b className='text-cyan-700'>{detailStore?.name}</b>
                        </h3>
                        <Link href={`/admin/store`} className='text-xl'>
                            &lt; Quay trở về danh sách
                        </Link>
                    </div>
                    <hr className='mt-2' />
                    <div className='mt-4'>
                        <Tabs defaultValue='base' className='flex gap-5'>
                            <TabsList className='flex flex-col justify-start gap-5'>
                                <TabsTrigger
                                    className='flex w-full items-center justify-start gap-5  bg-muted text-xl text-default'
                                    value='base'
                                >
                                    <Database />
                                    Base
                                </TabsTrigger>
                                <TabsTrigger
                                    className='flex w-full items-center justify-start gap-5  bg-muted text-xl text-default'
                                    value='staff'
                                >
                                    <CircleUserIcon />
                                    Edit Staff
                                </TabsTrigger>
                                <TabsTrigger
                                    className='flex w-full items-center justify-start gap-5  bg-muted text-xl text-default'
                                    value='opening'
                                >
                                    <Clock />
                                    Opening Hours
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value='base' className='w-full'>
                                {detailStore && <BaseStore store={detailStore} refetch={refetch} />}
                            </TabsContent>

                            <TabsContent value='staff' className='w-full'>
                                {detailStore && <ManagerStaff store={detailStore} />}
                            </TabsContent>

                            <TabsContent value='opening' className='w-full'>
                                {detailStore && <HourOpening store={detailStore} />}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            )}
            {isLoading && (
                <div className='flex h-[80vh] items-center justify-center'>
                    <LoadingButton className='h-[120px] w-[120px]' />
                </div>
            )}
        </div>
    );
}
