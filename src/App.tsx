import { SearchForm } from './features/search/SearchForm';

function App() {
  return (
    <main className='max-w-2xl mx-auto p-6'>
      <h1 className='text-2xl font-semibold mb-4 text-blue-700'>Форма пошук турів</h1>
      <SearchForm
        onSubmit={data => {
          console.log('Submit:', data);
        }}
      />
    </main>
  );
}

export default App;
