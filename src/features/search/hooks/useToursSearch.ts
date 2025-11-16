import { useState, useCallback, useMemo, useRef } from 'react';

import type { ErrorResponse } from '../../../types/errors';
import type { SearchToursState, SearchToursResult, TourAggregate, HotelsMap, PricesMap } from '../../../types/models';

import { getHotels, stopSearchPrices } from '../../../api/api';
import { runSearchFlow } from '../services/runSearchFlow';

const hotelsCache: Record<string, HotelsMap> = {};

const initialState: SearchToursState = {
  status: 'idle',
  error: null,
  resultsByCountry: {},
  currentCountryId: null,
};

export const useToursSearch = () => {
  const [state, setState] = useState<SearchToursState>(initialState);

  const activeTokenRef = useRef<string | null>(null);

  const abortMark = useRef(0);

  const abortRef = useRef<AbortController | null>(null);

  const [isCancelling, setIsCancelling] = useState(false);

  const currentResult: SearchToursResult | null = useMemo(() => {
    if (!state.currentCountryId) return null;
    return state.resultsByCountry[state.currentCountryId] || null;
  }, [state.currentCountryId, state.resultsByCountry]);

  const buildAggregatedResults = useCallback(async (countryId: string, prices: PricesMap): Promise<TourAggregate[]> => {
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
  }, []);

  const cancelActiveSearch = useCallback(async () => {
    if (!activeTokenRef.current) return;

    setIsCancelling(true);

    try {
      await stopSearchPrices(activeTokenRef.current);
    } catch {
      /* empty */
    }

    activeTokenRef.current = null;

    abortMark.current += 1;

    if (abortRef.current) {
      abortRef.current.abort();
    }

    setIsCancelling(false);
  }, []);

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

      if (activeTokenRef.current) {
        await cancelActiveSearch();
      }

      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      abortMark.current += 1;
      const myMark = abortMark.current;

      setState(prev => ({
        ...prev,
        status: 'loading',
        error: null,
        currentCountryId: countryId,
      }));

      try {
        const { prices, token } = await runSearchFlow(countryId, {
          maxRetries: 2,
          signal: controller.signal,
        });

        activeTokenRef.current = token;

        if (myMark !== abortMark.current) return;

        setState(prev => ({
          ...prev,
          status: 'success',
          error: null,
          resultsByCountry: {
            ...prev.resultsByCountry,
            [countryId]: {
              countryId,
              prices: prices as PricesMap,
              receivedAt: Date.now(),
            },
          },
        }));
      } catch (err) {
        const e = err as ErrorResponse;

        if (controller.signal.aborted || myMark !== abortMark.current) return;

        setState(prev => ({
          ...prev,
          status: 'error',
          error: e.message || 'Сталася помилка',
        }));
      }
    },
    [state.resultsByCountry, cancelActiveSearch]
  );

  return {
    ...state,
    currentResult,
    searchTours,
    buildAggregatedResults,
    isCancelling,
  };
};
