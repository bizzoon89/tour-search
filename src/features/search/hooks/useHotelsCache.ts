import { useRef } from 'react';
import type { HotelsMap } from '../../../types/models';
import { getHotels } from '../../../api/api';

export const useHotelsCache = () => {
  const cache = useRef<Record<string, HotelsMap>>({});

  const loadHotels = async (countryID: string) => {
    if (cache.current[countryID]) {
      return cache.current[countryID];
    }

    const resp = await getHotels(countryID);
    const hotels = await resp.json();
    cache.current[countryID] = hotels;

    return hotels;
  };

  return { loadHotels };
};
