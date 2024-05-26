'use client';

import { useQuery } from '@tanstack/react-query';
import { SETTING_DEFAULT } from '~/constants/queryKey';

export const useSettingQuery = () => {
    return useQuery({
        queryKey: [SETTING_DEFAULT],
        queryFn: async () => {
            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting`).then((res) => res.json());
            return result;
        },
    });
};
