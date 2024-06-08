import ServiceCard from '~/components/elements/ServiceCard';
import { useGetServicesQuery } from '~/store/services/services.service';
import { IService } from '~/types/Service';

const ChooseService = () => {
    const { data, isLoading, isFetching } = useGetServicesQuery();
    const serviceList = data?.data?.data;

    return (
        <div>
            Choose service
            {!isLoading &&
                !isFetching &&
                serviceList?.map((service: IService) => <ServiceCard key={service.id} service={service} />)}
        </div>
    );
};

export default ChooseService;
