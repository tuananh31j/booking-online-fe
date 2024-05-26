import Logo from '~/components/Layouts/Header/_components/Logo';
import Socials from '~/components/Layouts/Header/_components/Socials';
import SwitchOptions from '~/components/Layouts/Header/_components/SwitchOptions';

const Header = () => {
    return (
        <header className='pt-[5px] md:fixed md:w-full'>
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
