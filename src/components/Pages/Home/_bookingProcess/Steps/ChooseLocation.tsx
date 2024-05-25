import LocationCard from '~/components/elements/LocationCard';

const ChooseLocation = ({ nextStep }: { nextStep: () => void }) => {
    return (
        <div>
            <LocationCard nextStep={nextStep} />
            <LocationCard nextStep={nextStep} />
            <LocationCard nextStep={nextStep} />
            <LocationCard nextStep={nextStep} />
        </div>
    );
};

export default ChooseLocation;
