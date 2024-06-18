import ServiceCard from '~/components/elements/ServiceCard';
import { useGetListServiceClientQuery } from '~/store/services/service.service';
import WrapperBooking from '../WrapperBooking';
import useBooking from '~/hooks/useBooking';
import { useState } from 'react';

const ChooseService = () => {
    const { chooseServiceinfo } = useBooking();
    const [selectService, setSelectService] = useState<number[]>([]);
    const { data, isLoading } = useGetListServiceClientQuery();
    const handleSelectService = (id: number) => {
        setSelectService([...selectService, id]);
    };
    const handleRemoveService = (id: number) => {
        const list = selectService.filter((item) => item !== id);
        setSelectService(list);
    };
    const handleGetListService = () => {
        const list = selectService.map((item) => ({ id: item }));
        chooseServiceinfo(list);
    };

    return (
        <WrapperBooking stepKeyTranslation='step_service' isLoading={isLoading} handleNextStep={handleGetListService}>
            {data &&
                data.data.data.map((item) => (
                    <ServiceCard
                        key={item.id}
                        service={item}
                        handleSelect={() => handleSelectService(item.id)}
                        handleRemove={() => handleRemoveService(item.id)}
                    />
                ))}
        </WrapperBooking>
    );
};

export default ChooseService;
