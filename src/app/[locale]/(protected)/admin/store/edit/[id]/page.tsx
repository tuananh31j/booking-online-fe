'use client';

import { Tabs } from '@radix-ui/react-tabs';
import { CircleUserIcon, Clock, Database } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import BaseStore from '~/app/[locale]/(protected)/admin/store/edit/[id]/_components/BaseStore';
import HourOpening from '~/app/[locale]/(protected)/admin/store/edit/[id]/_components/HourOpening';
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
                        <Tabs defaultValue='base' className='flex flex-wrap gap-5 md:flex-nowrap'>
                            <TabsList className='flex w-full flex-col flex-wrap justify-start gap-5 md:w-[unset] md:flex-nowrap'>
                                <TabsTrigger
                                    className='flex w-fit max-w-80 items-center justify-start gap-5 bg-muted  text-xl text-default md:w-full'
                                    value='base'
                                >
                                    <Database />
                                    <span className='hidden md:block'>Base</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    className='flex w-fit max-w-80 items-center justify-start gap-5 bg-muted  text-xl text-default md:w-full'
                                    value='password'
                                >
                                    <CircleUserIcon />
                                    <span className='hidden md:block'> Edit Staff</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    className='flex w-fit max-w-80 items-center justify-start gap-5 bg-muted  text-xl text-default md:w-full'
                                    value='opening'
                                >
                                    <Clock />
                                    <span className='hidden md:block'> Opening Hours</span>
                                </TabsTrigger>
                            </TabsList>
                            <div>
                                <TabsContent value='base' className='w-full'>
                                    {detailStore && <BaseStore store={detailStore} refetch={refetch} />}
                                </TabsContent>
                                <TabsContent value='opening' className='w-full'>
                                    {detailStore && <HourOpening store={detailStore} />}
                                </TabsContent>
                            </div>
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
