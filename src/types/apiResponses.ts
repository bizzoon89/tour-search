import type { PricesMap } from './models';

export type StartSearchResponse = {
  token: string;
  waitUntil: string;
};

export type GetSearchPricesResponse = {
  prices: PricesMap;
};

export type StopSearchResponse = {
  status: 'cancelled';
  message: string;
};
