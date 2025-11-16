import { useEffect, useState } from 'react';
import { apiClient } from '../../../api/client';
import type { PriceOffer, Hotel } from '../../../types/models';

export const useTourDetails = (priceId?: string, hotelId?: string) => {
  const [price, setPrice] = useState<PriceOffer | null>(null);
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!priceId || !hotelId) return;

    let canceled = false;

    const load = async () => {
      try {
        setLoading(true);

        const [priceResp, hotelResp] = await Promise.all([apiClient.getPrice(priceId), apiClient.getHotel(hotelId)]);

        if (canceled) return;

        setPrice(priceResp);
        setHotel(hotelResp);
      } catch (e: unknown) {
        if (!canceled) {
          const err = e as { message?: string };
          setError(err.message ?? 'Помилка завантаження');
        }
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    load();

    return () => {
      canceled = true;
    };
  }, [priceId, hotelId]);

  return { price, hotel, loading, error };
};
