const StaffCard = () => {
    const image = 'https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg';
    return (
        <div className='px-[2.625rem] py-7'>
            <a href='/'>
                <div
                    className='bg-cover bg-center bg-no-repeat pt-[100%]'
                    style={{
                        backgroundImage: `url(${image})`,
                    }}
                ></div>
            </a>
            <h4 className='bg-card py-4 text-center text-lg'>Staffs name</h4>
        </div>
    );
};

export default StaffCard;
