import Logo from '~/components/layouts/Header/_components/Logo';
import Socials from '~/components/layouts/Header/_components/Socials';
import SwitchOptions from '~/components/layouts/Header/_components/SwitchOptions';
import { cn } from '~/lib/utils';

const Header = ({ className }: { className?: string }) => {
    return (
        <header className={cn('pt-[5px]  md:w-full', className)}>
            <div className='mx-6 flex max-w-[1440px] items-center justify-between lg:items-start custom:mx-auto '>
                <Logo />
                <Socials />
                <SwitchOptions />
            </div>
            <div className='mt-[5px] h-[1px] w-full bg-default'></div>
        </header>
    );
};

export default Header;
