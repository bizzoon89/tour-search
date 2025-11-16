import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { formatDate, formatMoney } from '../../features/search/utils/time';
import type { Hotel, PriceOffer } from '../../types/models';

type TourHeaderCardProps = {
  hotel: Hotel;
  price: PriceOffer;
  withLink?: boolean;
  withDivider?: boolean;
};

export const TourHeaderCard = ({ hotel, price, withLink = false, withDivider = false }: TourHeaderCardProps) => {
  return (
    <div className={`flex flex-col gap-4 ${withDivider ? 'border-t border-gray-200 pt-4' : ''}`}>
      <div className='w-full h-48 rounded-xl overflow-hidden'>
        <img
          src={hotel.img}
          alt={hotel.name}
          className='w-full h-full object-cover'
        />
      </div>

      <h2 className='text-xl font-bold text-gray-900'>{hotel.name}</h2>

      <div className='flex items-center gap-4 text-gray-700 text-sm'>
        <span className='flex items-center gap-1'>
          <MapPinIcon className='w-4 h-4' />
          {hotel.countryName}
        </span>

        <span className='flex items-center gap-1'>
          <MapPinIcon className='w-4 h-4' />
          {hotel.cityName}
        </span>
      </div>

      <div className='flex items-center gap-2 text-gray-700'>
        <CalendarIcon className='w-5 h-5' />
        {formatDate(price.startDate)} — {formatDate(price.endDate)}
      </div>

      <div className='flex items-center justify-between'>
        <div className='text-2xl font-bold text-gray-900'>{formatMoney(price.amount)}</div>

        {withLink ? (
          <Link
            to={`/tour/${price.id}/${hotel.id}`}
            className='text-blue-600 hover:underline font-medium'
          >
            Відкрити ціну
          </Link>
        ) : (
          <Button>Відкрити ціну</Button>
        )}
      </div>
    </div>
  );
};
