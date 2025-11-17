import { TourCard } from '../../../components/TourCard';
import type { TourAggregate } from '../../../types/models';

type SearchResultsProps = {
  results: TourAggregate[];
};

export const SearchResults = ({ results }: SearchResultsProps) => {
  if (results.length === 0) {
    return <div className='w-[700px] mx-auto p-6 text-center text-gray-500'>За вашим запитом турів не знайдено</div>;
  }

  const sorted = [...results].sort((a, b) => a.amount - b.amount);

  return (
    <div className='max-[700px]: mx-auto p-[25px]'>
      <div className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
        {sorted.map(tour => (
          <TourCard
            key={tour.id}
            tour={tour}
          />
        ))}
      </div>
    </div>
  );
};
