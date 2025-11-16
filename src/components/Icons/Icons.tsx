import { WifiIcon, SwatchIcon, Bars3Icon } from '@heroicons/react/24/outline';
import type { JSX } from 'react';

export const CountryIcon = () => <span className='text-base'>🌍</span>;
export const CityIcon = () => <span className='text-base'>🏙️</span>;
export const HotelIcon = () => <span className='text-base'>🏨</span>;

type ServiceIconProps = {
  type: 'wifi' | 'aquapark' | 'meals' | 'tennis' | 'parking' | 'laundry';
  label: string;
};

export const ServiceIcon = ({ type, label }: ServiceIconProps) => {
  const icons: Record<string, JSX.Element> = {
    wifi: <WifiIcon className='w-4 h-4' />,
    aquapark: <SwatchIcon className='w-4 h-4' />,
    meals: <Bars3Icon className='w-4 h-4' />,
    tennis: <span className='text-base'>🎾</span>,
    parking: <span className='text-base'>🚗</span>,
    laundry: <span className='text-base'>🧺</span>,
  };

  return (
    <span className='flex items-center gap-1 text-gray-700 text-sm'>
      {icons[type]}
      {label}
    </span>
  );
};
