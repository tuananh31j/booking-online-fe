import ServiceCard from '~/components/elements/ServiceCard';
import { useGetListServiceClientQuery } from '~/store/services/service.service';
import WrapperBooking from '../WrapperBooking';
import useBooking from '~/hooks/useBooking';

const ChooseService = () => {
    const { chooseServiceinfo, bookingInfo, totalSeviceCompletionTime } = useBooking();
    const { data, isLoading } = useGetListServiceClientQuery();
    const handleSelectService = (id: number, time: number) => {
        const newTotalTimeService = totalSeviceCompletionTime + time;
        chooseServiceinfo({
            services: [...bookingInfo.service_ids, id],
            totalTime: newTotalTimeService,
        });
    };
    const handleRemoveService = (id: number, time: number) => {
        const list = bookingInfo.service_ids.filter((item) => item !== id);
        const newTotalTimeService = totalSeviceCompletionTime - time;
        chooseServiceinfo({ services: list, totalTime: newTotalTimeService });
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
                        key={item.id}
                        service={item}
                        handleSelect={() => handleSelectService(item.id, item.time)}
                        handleRemove={() => handleRemoveService(item.id, item.time)}
                    />
                ))}
        </WrapperBooking>
    );
};

export default ChooseService;
