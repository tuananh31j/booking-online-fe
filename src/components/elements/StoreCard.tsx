import PopupStoreDetails from './PopupStoreDetails';
import MapIcon from '~/components/_common/Icons/map/Map';
import ArrowIcon from '~/components/_common/Icons/arrow/Arrow';
import { IStore } from '~/types/Store';

interface IStoreCardProps extends React.HTMLProps<HTMLDivElement> {
    handleGetStore: () => void;
    store: IStore;
}

const StoreCard: React.FC<IStoreCardProps> = ({ store, handleGetStore }) => {
    return (
        <div className='border-gray mx-auto mt-5 flex cursor-pointer rounded-lg border-b-[3px] border-l-2 border-r-2 border-t-[1px] px-1 py-[8px] duration-300  hover:border-default dark:border-white md:gap-5 md:px-[16p] lg:px-[32px]'>
            <PopupStoreDetails
                address={store.address}
                location={store.location ? store.location : ''}
                name={store.name}
                phone={store.phone}
            >
                <MapIcon className='dark:invert' />
            </PopupStoreDetails>

            <div onClick={() => handleGetStore()} className='flex w-full justify-between'>
                <div className='details'>
                    <div className='address text-2xl font-medium dark:text-white'>{store.name}</div>

                    <div className='small-address text-lg font-medium dark:text-white'>{store.address}</div>
                </div>

                <button onClick={() => handleGetStore()} className='flex items-center'>
                    <ArrowIcon className='dark:invert' />
                </button>
            </div>
        </div>
    );
};
export default StoreCard;
