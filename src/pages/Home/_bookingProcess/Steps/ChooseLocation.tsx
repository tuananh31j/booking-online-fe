/* eslint-disable no-unused-vars */
import LocationCard from '~/components/elements/LocationCard';
// example data id location
const data = [
    {
        id: '1',
        name: 'Nailkitchen 1 - 62 Tu Hoa, Tay Ho (Westlake Area - near Sheraton Hotel)',
        desc: '62 Từ Hoa, Hanoi, Hanoi, 10000.',
    },
    {
        id: '2',
        name: 'Nailkitchen 2 - 62 Tu Hoa, Tay Ho (Westlake Area - near Sheraton Hotel)',
        desc: '62 Từ Hoa, Hanoi, Hanoi, 10000.',
    },
    {
        id: '3',
        name: 'Nailkitchen 3 - 62 Tu Hoa, Tay Ho (Westlake Area - near Sheraton Hotel)',
        desc: '62 Từ Hoa, Hanoi, Hanoi, 10000.',
    },
    {
        id: '4',
        name: 'Nailkitchen 4 - 62 Tu Hoa, Tay Ho (Westlake Area - near Sheraton Hotel)',
        desc: '62 Từ Hoa, Hanoi, Hanoi, 10000.',
    },
    {
        id: '5',
        name: 'Nailkitchen 4 - 62 Tu Hoa, Tay Ho (Westlake Area - near Sheraton Hotel)',
        desc: '62 Từ Hoa, Hanoi, Hanoi, 10000.',
    },
    {
        id: '6',
        name: 'Nailkitchen 4 - 62 Tu Hoa, Tay Ho (Westlake Area - near Sheraton Hotel)',
        desc: '62 Từ Hoa, Hanoi, Hanoi, 10000.',
    },
    {
        id: '7',
        name: 'Nailkitchen 4 - 62 Tu Hoa, Tay Ho (Westlake Area - near Sheraton Hotel)',
        desc: '62 Từ Hoa, Hanoi, Hanoi, 10000.',
    },
    {
        id: '8',
        name: 'Nailkitchen 4 - 62 Tu Hoa, Tay Ho (Westlake Area - near Sheraton Hotel)',
        desc: '62 Từ Hoa, Hanoi, Hanoi, 10000.',
    },
];
const ChooseLocation = ({
    nextStep,
    handleGetLocation,
}: {
    nextStep: () => void;
    handleGetLocation: (id: string) => void;
}) => {
    return (
        <div>
            {/* use map function to render data */}
            {data.map((item, index: number) => (
                // onclick props need handleClick to get Id for render step
                <LocationCard data={item} key={index} onClick={() => handleGetLocation(item.id)} nextStep={nextStep} />
            ))}
        </div>
    );
};

export default ChooseLocation;
