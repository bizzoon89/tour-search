import { useEffect, useRef, useState } from 'react';
import { Input } from '../../../components/Input';
import { useDebounce } from '../hooks/useDebounce';
import { useSearchApi } from '../hooks/useSearchApi';
import type { GeoEntity } from '../../../types/models';
import { SearchDropdown } from '../../../components/SearchDropdown';

type SearchFieldProps = {
  value: GeoEntity | null;
  onChange: (v: GeoEntity | null) => void;
};

export const SearchField = ({ value, onChange }: SearchFieldProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { items, loading, loadCountries, loadSearchGeo } = useSearchApi();

  const debouncedSearch = useDebounce((text: string) => {
    if (text.trim()) loadSearchGeo(text);
  }, 400);

  const handleFocus = async () => {
    setOpen(true);
    if (!query.trim()) await loadCountries();
    else await loadSearchGeo(query);
  };

  const handleChange = (v: string) => {
    setQuery(v);
    setOpen(true);
    if (v.trim()) debouncedSearch(v);
    else loadCountries();
  };

  const handleClick = async () => {
    setOpen(true);
    if (value) {
      if (value.type === 'country') await loadCountries();
      else if (value.type === 'city' || value.type === 'hotel') await loadSearchGeo(value.name);
    } else {
      if (!query.trim()) await loadCountries();
      else await loadSearchGeo(query);
    }
  };

  const handleSelect = (entity: GeoEntity) => {
    onChange(entity);
    setQuery(entity.name);
    setOpen(false);
  };

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!inputRef.current?.closest('.search-field')?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, []);

  return (
    <div className='search-field relative'>
      <Input
        ref={inputRef}
        value={query}
        onFocus={handleFocus}
        onClick={handleClick}
        onChange={e => handleChange(e.target.value)}
        placeholder='Куди хочете поїхати?'
      />
      <SearchDropdown
        visible={open}
        loading={loading}
        items={items}
        onSelect={handleSelect}
      />
    </div>
  );
};
