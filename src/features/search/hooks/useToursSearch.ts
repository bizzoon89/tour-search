import { useState, useCallback, useMemo, useRef } from 'react';
import type { ErrorResponse } from '../../../types/errors';
import { runSearchFlow } from '../services/runSearchFlow';
import type { SearchToursResult, SearchToursState, PriceOffer, TourAggregate, HotelsMap } from '../../../types/models';
import { getHotels } from '../../../api/api';

const hotelsCache: Record<string, HotelsMap> = {};

const initialState: SearchToursState = {
  status: 'idle',
  error: null,
  resultsByCountry: {},
  currentCountryId: null,
};

export const useToursSearch = () => {
  const [state, setState] = useState<SearchToursState>(initialState);
  const abortRef = useRef<AbortController | null>(null);

  const currentResult: SearchToursResult | null = useMemo(() => {
    if (!state.currentCountryId) return null;
    return state.resultsByCountry[state.currentCountryId] || null;
  }, [state.currentCountryId, state.resultsByCountry]);

  const buildAggregatedResults = useCallback(
    async (countryId: string, prices: Record<string, PriceOffer>): Promise<TourAggregate[]> => {
      // 1. кеш готелів
      if (!hotelsCache[countryId]) {
        const resp = await getHotels(countryId);
        hotelsCache[countryId] = await resp.json();
      }

      const hotels = hotelsCache[countryId];

      return Object.values(prices).map(p => ({
        id: p.id,
        amount: p.amount,
        startDate: p.startDate,
        endDate: p.endDate,
        hotel: hotels[p.hotelID!],
      }));
    },
    []
  );

  const searchTours = useCallback(
    async (countryId: string) => {
      if (!countryId) return;

      const cached = state.resultsByCountry[countryId];
      if (cached) {
        setState(prev => ({
          ...prev,
          status: 'success',
          error: null,
          currentCountryId: countryId,
        }));
        return;
      }

      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setState(prev => ({
        ...prev,
        status: 'loading',
        error: null,
        currentCountryId: countryId,
      }));

      try {
        const prices = await runSearchFlow(countryId, {
          maxRetries: 2,
          signal: controller.signal,
        });

        setState(prev => ({
          ...prev,
          status: 'success',
          error: null,
          resultsByCountry: {
            ...prev.resultsByCountry,
            [countryId]: {
              countryId,
              prices,
              receivedAt: Date.now(),
            },
          },
        }));
      } catch (err) {
        const e = err as ErrorResponse;

        if (controller.signal.aborted) return;

        setState(prev => ({
          ...prev,
          status: 'error',
          error: e.message || 'Сталася помилка',
        }));
      }
    },
    [state.resultsByCountry]
  );

  return {
    ...state,
    currentResult,
    searchTours,
    buildAggregatedResults,
  };
};
