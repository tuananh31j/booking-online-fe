'use client';

import { cn } from '~/lib/utils';

const Footer = ({ className }: { className?: string }) => {
    return (
        <div className={cn(' bg-gradient-to-r from-[#FC9F9F] to-[#9BCBF8] py-3 text-center text-reverse ', className)}>
            Copyright to ImtaLabs @ {new Date().getFullYear()}
        </div>
    );
};

export default Footer;
