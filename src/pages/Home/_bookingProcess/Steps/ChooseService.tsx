// import ServiceCard from '~/components/elements/ServiceCard';
// import { useGetListServiceQuery } from '~/store/services/service.service';
// import { IService } from '~/types/Service';

const ChooseService = () => {
    // const { data, isLoading, isFetching } = useGetListServiceQuery();
    // const serviceList = data?.data?.data;

    return (
        <div>
            Choose service
            {/* {!isLoading &&
                !isFetching &&
                serviceList?.map((service: IService) => <ServiceCard key={service.id} service={service} />)} */}
        </div>
    );
};

export default ChooseService;
