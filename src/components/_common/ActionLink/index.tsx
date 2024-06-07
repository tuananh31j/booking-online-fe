'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import { cn } from '~/lib/utils';

type IActionProps = {
    className: string[] | string;
    to: string;
    children: React.ReactNode;
};

const ActionLink = forwardRef<LinkProps & HTMLAnchorElement, IActionProps>(({ className, to, children }, ref) => {
    const pathname = usePathname();
    const endPointPath = pathname ? pathname.split('/').pop() : '';
    const isClassNameArray = Array.isArray(className);
    const isActive = (pathname === to || endPointPath === to) && isClassNameArray;
    const normalClass = isClassNameArray ? className[0] : className;
    const activeClass = isClassNameArray ? className[1] : '';

    return (
        <Link ref={ref} href={to} className={cn(normalClass, { [activeClass]: isActive })}>
            {children}
        </Link>
    );
});

ActionLink.displayName = 'ActiveLink';
export default ActionLink;
