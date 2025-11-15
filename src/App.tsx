import { useState } from 'react';
import { SearchForm } from './features/search/SearchForm';
import { useToursSearch } from './features/search/hooks/useToursSearch';
import type { GeoEntity } from './types/models';

function App() {
  const { status, error, currentResult, searchTours } = useToursSearch();

  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = ({ destination }: { destination: GeoEntity | null }) => {
    if (!destination) {
      setFormError('Будь ласка, виберіть напрямок зі списку.');
      return;
    }

    if (destination.type !== 'country') {
      setFormError('Пошук турів можливий лише за країною.');
      return;
    }

    setFormError(null);

    searchTours(destination.id);
  };

  const isLoading = status === 'loading';
  const isError = status === 'error';
  const isSuccess = status === 'success';

  const hasResults = !!currentResult && Object.keys(currentResult.prices).length > 0;

  const isEmpty = isSuccess && !hasResults;

  return (
    <main className='max-w-2xl mx-auto p-6 space-y-4'>
      <h1 className='text-2xl font-semibold mb-4 text-blue-700'>Форма пошуку турів</h1>

      <SearchForm onSubmit={handleSubmit} />

      {formError && <p className='text-red-600 font-medium'>{formError}</p>}

      {isLoading && <p className='text-blue-600'>Пошук турів... Зачекайте.</p>}

      {isError && error && <p className='text-red-600 font-medium'>Помилка: {error}</p>}

      {isEmpty && <p className='text-gray-600'>За вашим запитом турів не знайдено.</p>}

      {hasResults && (
        <p className='text-green-700 font-medium'>Знайдено турів: {Object.keys(currentResult!.prices).length}</p>
      )}
    </main>
  );
}

export default App;
