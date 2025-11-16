import { useState } from 'react';
import type { GeoEntity } from '../../../types/models';
import { Button } from '../../../components/Button';
import { SearchField } from '../SearchField';

type SearchFormProps = { onSubmit: (data: { destination: GeoEntity | null }) => void };

export const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const [destination, setDestination] = useState<GeoEntity | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ destination });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col sm:flex-row gap-3 sm:items-end'
    >
      <div className='flex flex-col flex-1'>
        <label className='text-sm text-gray-600 mb-1'>Напрямок</label>
        <SearchField
          value={destination}
          onChange={setDestination}
        />
      </div>

      <Button type='submit'>Знайти</Button>
    </form>
  );
};
