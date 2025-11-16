import { Link, useParams } from 'react-router-dom';
import { useTourDetails } from '../features/tour/hooks/useTourDetails';
import { TourHeaderCard } from '../components/TourHeaderCard';
import { ServiceIcon } from '../components/Icons';

export const TourPage = () => {
  const { priceId, hotelId } = useParams();
  const { price, hotel, loading, error } = useTourDetails(priceId, hotelId);

  if (loading) return <p className='p-6'>Завантаження...</p>;
  if (error || !price || !hotel) return <p className='p-6 text-red-600'>Помилка: {error ?? 'Невідома помилка'}</p>;

  return (
    <main className='max-w-2xl mx-auto p-6'>
      <div className='mb-6'>
        <Link
          to='/'
          className='text-blue-600 hover:underline'
        >
          ← Назад до пошуку
        </Link>
      </div>

      <div className='bg-white border border-gray-200 rounded-2xl shadow p-6 space-y-8'>
        <TourHeaderCard
          hotel={hotel}
          price={price}
        />

        <div className='pt-4 border-t border-gray-200'>
          <h2 className='font-semibold mb-1'>Опис</h2>
          <p className='text-gray-700'>{hotel.description}</p>
        </div>

        <div className='pt-4 border-t border-gray-200'>
          <h2 className='font-semibold mb-3'>Сервіси</h2>

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
      </div>
    </main>
  );
};
