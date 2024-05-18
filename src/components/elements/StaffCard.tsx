const StaffCard = () => {
    return (
        <div className='flex w-full flex-col px-[2.625rem] py-7'>
            <div
                className='bg-cover bg-center bg-no-repeat pt-[100%]'
                style={{
                    backgroundImage: `url(https://i.pinimg.com/564x/4e/79/d3/4e79d37bd5fe58e4f9630ee21a61f4a8.jpg)`,
                }}
            ></div>
            <h4 className='bg-card-foreground py-4 text-center text-lg'>Staffs name</h4>
        </div>
    );
};

export default StaffCard;
