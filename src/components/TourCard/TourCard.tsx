import { Link } from 'react-router-dom';
import { formatDate, formatMoney } from '../../features/search/utils/time';
import type { TourAggregate } from '../../types/models';

type propsTourCard = {
  tour: TourAggregate;
};

export const TourCard = ({ tour }: propsTourCard) => {
  const h = tour.hotel;

  return (
    <div className='border border-gray-300 rounded-xl p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition'>
      <img
        src={h.img}
        alt={h.name}
        className='w-full h-40 object-cover rounded-lg'
      />

      <h3 className='text-lg font-semibold'>{h.name}</h3>

      <div className='text-gray-600 text-sm'>
        {h.countryName}, {h.cityName}
      </div>

      <div className='text-gray-600 text-sm'>Старт туру</div>

      <div className='text-sm text-gray-700'>
        {formatDate(tour.startDate)} — {formatDate(tour.endDate)}
      </div>

      <div className='text-xl font-bold mt-1'>{formatMoney(tour.amount)}</div>

      <Link
        to={`/tour/${tour.id}/${h.id}`}
        className='mt-auto inline-block text-blue-600 hover:underline font-medium'
      >
        Відкрити ціну
      </Link>
    </div>
  );
};
