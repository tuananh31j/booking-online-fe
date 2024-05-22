import Logo from '~/components/Layouts/Header/_components/Logo';
import Socials from '~/components/Layouts/Header/_components/Socials';
import SwitchOptions from '~/components/Layouts/Header/_components/SwitchOptions';

const Header = () => {
    return (
        <header className='pt-[15px]'>
            <div className='flex items-center justify-between lg:items-start'>
                <Logo />
                <Socials />
                <SwitchOptions />
            </div>
            <div className='mt-[17px] h-[1px] w-full bg-default'></div>
        </header>
    );
};

export default Header;
