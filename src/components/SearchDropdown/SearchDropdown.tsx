import type { GeoEntity } from '../../types/models';
import { Dropdown } from '../Dropdown';
import { CityIcon, CountryIcon, HotelIcon } from '../Icons';
import { Loader } from '../Loader';

const renderIcon = (type: GeoEntity['type']) => {
  switch (type) {
    case 'country':
      return <CountryIcon />;
    case 'city':
      return <CityIcon />;
    case 'hotel':
      return <HotelIcon />;
    default:
      return null;
  }
};

type SearchDropdownProps = {
  visible: boolean;
  loading: boolean;
  items: GeoEntity[];
  onSelect: (entity: GeoEntity) => void;
};

export const SearchDropdown = ({ visible, loading, items, onSelect }: SearchDropdownProps) => {
  return (
    <Dropdown visible={visible}>
      {loading && <Loader />}
      {!loading && items.length === 0 && (
        <div className='text-gray-500 text-sm p-3 text-center'>Нічого не знайдено</div>
      )}
      {!loading &&
        items.map(it => (
          <div
            key={`${it.type}-${it.id}`}
            onMouseDown={() => onSelect(it)}
            className='flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm'
          >
            <div className='flex items-center gap-2'>
              {renderIcon(it.type)}
              <span>{it.name}</span>
            </div>
          </div>
        ))}
    </Dropdown>
  );
};
