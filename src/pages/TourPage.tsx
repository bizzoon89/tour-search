import { Link, useParams } from 'react-router-dom';
import { useTourDetails } from '../features/tour/hooks/useTourDetails';
import { formatDate } from '../features/search/utils/time';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { ServiceIcon } from '../components/Icons';
import { Button } from '../components/Button';

export const TourPage = () => {
  const { priceId, hotelId } = useParams<{ priceId: string; hotelId: string }>();
  const { price, hotel, loading, error } = useTourDetails(priceId, hotelId);

  if (loading)
    return (
      <main className='max-w-2xl mx-auto p-6'>
        <p className='text-blue-600'>Завантаження туру...</p>
      </main>
    );

  if (error || !price || !hotel)
    return (
      <main className='max-w-2xl mx-auto p-6'>
        <p className='text-red-600'>Помилка: {error ?? 'невідома'}</p>
        <Link
          className='text-blue-600 hover:underline'
          to='/'
        >
          ← Назад до пошуку
        </Link>
      </main>
    );

  return (
    <main className='max-w-2xl mx-auto p-6'>
      <div className='mb-10'>
        <Link
          className='text-blue-600 hover:underline'
          to='/'
        >
          ← Назад до пошуку
        </Link>
      </div>
      <div className='bg-white rounded-2xl shadow p-6 border border-gray-200 space-y-6'>
        {/* Заголовок */}
        <div className='space-y-1'>
          <h1 className='text-2xl font-bold text-gray-900'>{hotel.name}</h1>

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
        </div>

        {/* Фото */}
        <div className='w-full h-48 rounded-xl overflow-hidden'>
          <img
            src={hotel.img}
            className='w-full h-full object-cover'
          />
        </div>

        {/* Опис */}
        <div className='pt-4 border-t border-gray-200'>
          <h2 className='font-semibold text-gray-900 mb-1'>Опис</h2>
          <p className='text-gray-700 leading-relaxed'>{hotel.description}</p>
        </div>

        {/* Сервіси */}
        <div className='pt-4 border-t border-gray-200'>
          <h2 className='font-semibold text-gray-900 mb-3'>Сервіси</h2>

          <div className='flex flex-wrap gap-4'>
            {hotel.services?.wifi === 'yes' && (
              <ServiceIcon
                type='wifi'
                label='Wi-Fi'
              />
            )}
            {hotel.services?.aquapark === 'yes' && (
              <ServiceIcon
                type='aquapark'
                label='Басейн'
              />
            )}
            {hotel.services?.meals === 'yes' && (
              <ServiceIcon
                type='meals'
                label='Харчування'
              />
            )}
            {hotel.services?.tennis_court === 'yes' && (
              <ServiceIcon
                type='tennis'
                label='Теніс'
              />
            )}
            {hotel.services?.parking === 'yes' && (
              <ServiceIcon
                type='parking'
                label='Паркінг'
              />
            )}
            {hotel.services?.laundry === 'yes' && (
              <ServiceIcon
                type='laundry'
                label='Пральня'
              />
            )}
          </div>
        </div>

        {/* Дата */}
        <div className='pt-4 border-t border-gray-200 flex items-center gap-2 text-gray-700'>
          <CalendarIcon className='w-5 h-5' />
          {formatDate(price.startDate)}
        </div>

        {/* Ціна + кнопка */}
        <div className='pt-4 border-t border-gray-200 flex justify-between items-center'>
          <div className='text-3xl font-bold text-gray-900'>
            {price.amount.toLocaleString()} {price.currency}
          </div>

          <Button>Відкрити ціну</Button>
        </div>
      </div>
    </main>
  );
};
