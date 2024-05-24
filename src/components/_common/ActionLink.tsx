import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef } from 'react';
import { cn } from '~/lib/utils';

type IActionProps = {
    activeClass: string;
    defaultClass: string;
    to: string;
};

const ActionLink = forwardRef<LinkProps & HTMLAnchorElement, IActionProps>(({ activeClass, defaultClass, to }, ref) => {
    const router = useRouter();
    const isActive = router.pathname === to;
    return <Link ref={ref} href={to} className={cn({ [activeClass]: isActive, [defaultClass]: !isActive })}></Link>;
});

ActionLink.displayName = 'ActiveLink';
export default ActionLink;
