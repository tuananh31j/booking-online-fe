'use client';

const Footer = () => {
    return (
        <div className='fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#FC9F9F] to-[#9BCBF8] py-3 text-center text-reverse '>
            Copyright to ImtaLabs @ {new Date().getFullYear()}
        </div>
    );
};

export default Footer;
