import { useState, useRef } from 'react';
import type { CountriesMap, GeoEntity } from '../../../types/models';
import { apiClient } from '../../../api/client';

const mapCountries = (countries: CountriesMap): GeoEntity[] =>
  Object.values(countries).map(c => ({ ...c, type: 'country' as const }));

export const useSearchApi = () => {
  const [items, setItems] = useState<GeoEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const countriesCache = useRef<CountriesMap | null>(null);

  const loadCountries = async () => {
    setLoading(true);
    try {
      if (!countriesCache.current) {
        countriesCache.current = await apiClient.getCountries();
      }
      setItems(mapCountries(countriesCache.current));
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const loadSearchGeo = async (text: string) => {
    setLoading(true);
    try {
      const data = await apiClient.searchGeo(text);
      setItems(Object.values(data));
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  return { items, loading, setItems, loadCountries, loadSearchGeo };
};
