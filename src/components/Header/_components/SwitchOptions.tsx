import React from 'react';
import { LangToggle } from '~/components/elements/LangToggle';
import { ModeToggle } from '~/components/elements/ModeToggle';

export default function SwitchOptions() {
    return (
        <>
            <div>
                <div className='flex flex-col-reverse items-center gap-2 md:flex-row'>
                    <ModeToggle className='w-[128px] md:w-auto' />
                    <LangToggle className='text-textlang border-textlang flex w-[128px]  gap-2  rounded-[5px] border-[1px] bg-langtoggle shadow-lg hover:bg-langtoggle  hover:opacity-80' />
                </div>
                <span className='flex items-center text-[14px] dark:text-white md:hidden  md:text-base'>
                    Liên hệ hỗ trợ: 0898737406
                </span>
            </div>
        </>
    );
}
