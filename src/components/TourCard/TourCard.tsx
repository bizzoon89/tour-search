import type { TourAggregate } from '../../types/models';
import { TourHeaderCard } from '../../components/TourHeaderCard';

type TourCardProps = { tour: TourAggregate };

export const TourCard = ({ tour }: TourCardProps) => {
  return (
    <div className='border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition'>
      <TourHeaderCard
        hotel={tour.hotel}
        price={{
          id: tour.id,
          amount: tour.amount,
          startDate: tour.startDate,
          endDate: tour.endDate,
          currency: 'usd',
        }}
        withLink={true}
      />
    </div>
  );
};
