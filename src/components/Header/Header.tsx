import Logo from '~/components/Header/_components/Logo';
import Socials from '~/components/Header/_components/Socials';
import SwitchOptions from '~/components/Header/_components/SwitchOptions';

const Header = () => {
    return (
        <header className='pt-[15px]'>
            <div className='mx-4 max-w-[1638px] md:mx-6 2xl:mx-auto'>
                <div className='flex items-center justify-between lg:items-start'>
                    <Logo />
                    <Socials />
                    <SwitchOptions />
                </div>
            </div>
            <div className='bg-default mt-[17px] h-[1px] w-full'></div>
        </header>
    );
};

export default Header;
