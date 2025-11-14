// src/api/client.ts

import * as api from './api';
import type { ErrorResponse } from '../types/errors';
import type { CountriesMap, GeoResponse } from '../types/models';
import type { GetSearchPricesResponse, StartSearchResponse, StopSearchResponse } from '../types/apiResponses';

const toJson = async <T>(promise: Promise<Response>): Promise<T> => {
  try {
    const res = await promise;
    if (!res.ok) {
      const err: ErrorResponse = await res.json().catch(() => ({
        error: true,
        code: res.status,
        message: res.statusText,
      }));
      throw err;
    }
    return (await res.json()) as T;
  } catch (e) {
    if (e instanceof Response) {
      const body = await e.json().catch(() => ({}));
      throw { code: e.status, ...body } as ErrorResponse;
    }
    throw e;
  }
};

export const apiClient = {
  getCountries: () => toJson<CountriesMap>(api.getCountries()),
  searchGeo: (query?: string) => toJson<GeoResponse>(api.searchGeo(query)),
  startSearchPrices: (countryID: string) => toJson<StartSearchResponse>(api.startSearchPrices(countryID)),
  getSearchPrices: (token: string) => toJson<GetSearchPricesResponse>(api.getSearchPrices(token)),
  stopSearchPrices: (token: string) => toJson<StopSearchResponse>(api.stopSearchPrices(token)),
};
