import StoreCard from '~/components/elements/StoreCard';
import useBooking from '~/hooks/useBooking';
import { useGetListStoreClientQuery } from '~/store/services/store.service';
import WrapperBooking from '../WrapperBooking';
// example data id location

const ChooseStore = () => {
    const { chooseStoreinfo } = useBooking();
    const { data, isLoading } = useGetListStoreClientQuery();

    return (
        <WrapperBooking stepKeyTranslation='step_store' isLoading={isLoading}>
            {data &&
                data.data.data.map((item, index: number) => (
                    <StoreCard store={item} key={index} handleGetStore={() => chooseStoreinfo(item)} />
                ))}
        </WrapperBooking>
    );
};

export default ChooseStore;
