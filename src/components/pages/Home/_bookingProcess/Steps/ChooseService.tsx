import ServiceCard from '~/components/elements/ServiceCard';
import { useGetListServiceClientQuery } from '~/store/services/service.service';
import WrapperBooking from '../WrapperBooking';
import useBooking from '~/hooks/useBooking';

const ChooseService = () => {
    const { chooseServiceinfo, bookingInfo, servicesName, selectServicesName } = useBooking();
    const { data, isLoading } = useGetListServiceClientQuery();
    const handleSelectService = (id: number, name: string) => {
        chooseServiceinfo({
            services: [...bookingInfo.service_ids, id],
        });
        selectServicesName([...servicesName, { id, name }]);
    };
    const handleRemoveService = (id: number) => {
        const list = bookingInfo.service_ids.filter((item) => item !== id);
        const listName = servicesName.filter((item) => item.id !== id);

        chooseServiceinfo({ services: list });
        selectServicesName(listName);
    };
    const isPickedService = bookingInfo.service_ids.length > 0;

    return (
        <WrapperBooking
            stepKeyTranslation='step_service'
            isLoading={isLoading}
            isButtonNextStep={{ isHide: false, active: isPickedService }}
        >
            {data &&
                data.data.data.map((item) => (
                    <ServiceCard
                        id={item.id}
                        key={item.id}
                        service={item}
                        handleSelect={() => handleSelectService(item.id, item.name)}
                        handleRemove={() => handleRemoveService(item.id)}
                    />
                ))}
        </WrapperBooking>
    );
};

export default ChooseService;
